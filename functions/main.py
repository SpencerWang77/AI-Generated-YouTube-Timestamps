# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

import os
import json
import logging
import httpx
from dotenv import load_dotenv
from firebase_functions import https_fn
from firebase_functions.options import set_global_options
from firebase_admin import initialize_app

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()

# For cost control, you can set the maximum number of containers that can be
# running at the same time. This helps mitigate the impact of unexpected
# traffic spikes by instead downgrading performance. This limit is a per-function
# limit. You can override the limit for each function using the max_instances
# parameter in the decorator, e.g. @https_fn.on_request(max_instances=5).
set_global_options(max_instances=10)

initialize_app()


@https_fn.on_call()
def generate_timestamps(req: https_fn.CallableRequest) -> dict:
    """
    HTTP callable function that generates timestamps for a YouTube video
    using the Bumpups API.
    
    Expected request data:
    {
        "url": "https://www.youtube.com/watch?v=..."
    }
    """
    logger.info("generate_timestamps function called")
    logger.info(f"Request data: {req.data}")
    
    # Get the YouTube URL from the request
    url = req.data.get("url")
    logger.info(f"Received YouTube URL: {url}")
    
    if not url:
        logger.error("YouTube URL is missing from request")
        raise https_fn.HttpsError(
            code=https_fn.FunctionsErrorCode.INVALID_ARGUMENT,
            message="YouTube URL is required"
        )
    
    # Get API key from environment variables
    api_key = os.getenv("BUMPUPS_API_KEY")
    
    if not api_key:
        logger.error("BUMPUPS_API_KEY not found in environment variables")
        raise https_fn.HttpsError(
            code=https_fn.FunctionsErrorCode.INTERNAL,
            message="API key not configured"
        )
    
    logger.info("API key loaded successfully")
    
    # Prepare the request payload
    payload = {
        "url": url,
        "model": "bump-1.0",
        "language": "en",
        "timestamps_style": "long"
    }
    logger.info(f"Prepared payload: {json.dumps(payload, indent=2)}")
    
    # Make the request to Bumpups API
    try:
        logger.info("Making request to Bumpups API...")
        response = httpx.post(
            "https://api.bumpups.com/general/timestamps",
            headers={
                "Content-Type": "application/json",
                "X-Api-Key": api_key
            },
            json=payload,
            timeout=60.0  # 60 second timeout for video processing
        )
        logger.info(f"Bumpups API response status: {response.status_code}")
        response.raise_for_status()
        
        response_data = response.json()
        logger.info(f"Successfully received timestamps. Video duration: {response_data.get('video_duration', 'N/A')} minutes")
        logger.info(f"Number of timestamps: {len(response_data.get('timestamps_list', []))}")
        
        # Return the response data
        return response_data
    
    except httpx.HTTPStatusError as e:
        logger.error(f"Bumpups API HTTP error: {e.response.status_code} - {e.response.text}")
        raise https_fn.HttpsError(
            code=https_fn.FunctionsErrorCode.INTERNAL,
            message=f"Bumpups API error: {e.response.status_code} - {e.response.text}"
        )
    except httpx.RequestError as e:
        logger.error(f"Request error: {str(e)}")
        raise https_fn.HttpsError(
            code=https_fn.FunctionsErrorCode.INTERNAL,
            message=f"Request error: {str(e)}"
        )