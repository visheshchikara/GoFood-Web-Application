import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";


export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      }
    });
    response = await response.json();
    console.log(response[0], response[1]);
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{ zIndex: "10" }} >
            <div className="d-flex justify-content-centre">
              <input className="form-control me-2" type="search" placeholder="Search" arial-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />

            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://cdn.pixabay.com/photo/2019/11/04/12/16/rice-4601049__340.jpg" className="d-block w-100" alt="..." style={{ height: "500px", objectFit: "fill" }} />
          </div>
          <div className="carousel-item">
            <img src="https://random-image-pepebigotes.vercel.app/api/random-image" className="d-block w-100" alt="..." style={{ height: "500px", objectFit: "fill" }} />
          </div>
          <div className="carousel-item">
            <img src="https://random.imagecdn.app/500/250" className="d-block w-100" alt="..." style={{ height: "500px", objectFit: "fill" }} />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        {
          foodCat ? foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {
                  foodItem ? foodItem.filter((item) =>
                    (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                    .map(filterItems => {
                      return (
                        <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                          <Card foodItem={filterItems}
                            options={filterItems.options[0]
                            }
                          ></Card>
                        </div>
                      )
                    })
                    : <div>No such data</div>
                }
              </div>

            )
          })
            : <div>""""""""""</div>
        }

      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
