import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantFinder from "../api/RestaurantFinder";

const UpdateRestaurant = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setName(response.data.data.restaurant.name);
        setLocation(response.data.data.restaurant.location);
        setPriceRange(response.data.data.restaurant.price_range);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.put(`/${id}`, {
        name,
        location,
        price_range: priceRange,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            className="form-control"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            className="form-control"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="priceRange">Price Range</label>
          <input
            id="priceRange"
            className="form-control"
            type="number"
            min="1"
            max="5"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
