import React, { useState, useContext } from "react";
import RestaurantFinder from "../api/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price range");
  const { addRestaurant } = useContext(RestaurantsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      addRestaurant(response.data.data.restaurant);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="col">
            <select
              className="custom-select  mr-sm-2"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option disabled>Price range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
