import React from 'react';
import './Bumpups.css';

const highlights = [
  {
    title: 'Fast Setup',
    description: 'Spin up your landing page in moments with ready-made blocks.',
  },
  {
    title: 'Modern Design',
    description: 'Gradient backgrounds and soft shadows keep things fresh.',
  },
  {
    title: 'Responsive',
    description: 'Looks great on phones, tablets, and desktops without extra work.',
  },
];

function Bumpups() {
  return (
    <section className="bumpups">
      <h2 className="bumpups-title">What you get</h2>
      <div className="bumpups-grid">
        {highlights.map(({ title, description }) => (
          <article key={title} className="bumpup-card">
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Bumpups;

