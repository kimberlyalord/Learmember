import React from 'react';
import { Link } from 'react-router-dom';

function TopicCard({ topic, handleDeleteTopic }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">{topic.name}</h2>
      </div>
      <div className="card-body">
        <dl>
          <dt>Category: </dt>
          <dd>{topic.category}</dd>
          <dt>Learned? </dt>
          <dd>{topic.learned ? `Yes!` : `Not yet!`}</dd>
          <dt>Created by: </dt>
          <dd>{`${topic.user}`}</dd>
        </dl>
      </div>
      <div>
        <Link to={{ pathname: '/update', state: { topic: topic } }}>EDIT TOPIC</Link>
        {/* <Link to={{ pathname: '/delete'}} onClick={() => handleDeleteTopic(topic._id)}>DELETE TOPIC</Link> */}
        <button onClick={() => handleDeleteTopic(topic._id)}>DELETE TOPIC</button>
      </div>
    </div>
  )
}

export default TopicCard;