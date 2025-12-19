const UserCard = ({user}) => {
    const {firstName, lastName, photoURL, age, gender, about, skills} = user;
    // console.log(user);
    return (
        <div className="card card-side bg-base-content shadow-sm text-base-300">
  <figure>
    <img
      src= {photoURL}
      alt="ProfileImage" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    { age && gender && (
        <h3>{age +" , " + gender}
        </h3>)
    }
    <p>{about}</p>
    <div className="card-actions justify-center my-4">
    <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
    );

};

export default UserCard;