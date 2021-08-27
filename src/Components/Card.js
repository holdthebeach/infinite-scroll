const Card = ({ title, imageUrl, name, index }) => {
  return (
    <div className="card" key={`card-${index}`}>
      <div className="info" style={{ backgroundImage: `url(${imageUrl})` }}>
        <h2>{title}</h2>
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default Card;
