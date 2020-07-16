import React from 'react';
import './TopicListPage.css';
import TopicCard from '../../components/TopicCard/TopicCard';

function TopicListPage({ topics }) {
  return (
    <>
      <h1>Your Learning Topics</h1>
      <div className='TopicListPage'>
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