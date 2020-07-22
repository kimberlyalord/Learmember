import React from 'react';
import { Link } from 'react-router-dom';

function TopicCard({ topic, handleDeleteTopic }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{topic.name}</h2>
      </div>
      <div className="card-body">
        <dl>
          <dt>Category: </dt>
          <dd>{topic.category}</dd>
          <dt>Learned? </dt>
          <dd>{topic.learned ? `Yes!` : `Not yet!`}</dd>
          <dt>Created by: </dt>
          <dd>{`${topic.user.username}`}</dd>
          <dt>Learning Resources: </dt>
          <dd>{topic.resource ? `${topic.resource}` : `No resources added yet!`}</dd>
        </dl>
      </div>
      <div className="card-footer">
        <Link to={{ pathname: '/update', state: { topic: topic } }}>EDIT TOPIC</Link>
        <Link to={{ pathname: '/delete'}} onClick={() => handleDeleteTopic(topic._id)}>DELETE TOPIC</Link>
      </div>
    </div>
  )
}

export default TopicCard;