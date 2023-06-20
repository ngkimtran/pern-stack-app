import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../api/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const Details = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data.restaurant);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id, setSelectedRestaurant]);

  return (
    <div>
      <h1 className="text-center">
        {selectedRestaurant && selectedRestaurant.name}
      </h1>
    </div>
  );
};

export default Details;
