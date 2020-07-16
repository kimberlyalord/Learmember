import React from 'react';
import './TopicListPage.css';
import TopicCard from '../../components/TopicCard/TopicCard';

function TopicListPage({ topics }) {
  return (
    <>
      <h2>Your Learning Topics</h2>
      <div>
        {topics.map(topic =>
          <TopicCard
            key={topic._id}
            topic={topic}
          />
          )};
      </div>
    </>
  )
}

export default TopicListPage;