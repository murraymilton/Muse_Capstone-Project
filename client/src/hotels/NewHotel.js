import { useState } from "react";
import { toast } from "react-toastify";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { DatePicker, Select } from "antd";
import moment from "moment";

const config = process.env.REACT_APP_GOOGLEPLACES_API_KEY;

const NewHotel = () => {
  // We are going to take the state and destructure it for easier usage
  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",
    image: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });
  const [preview, setPreview] = useState(
    "https://source.unsplash.com/user/erondu?text=PREVIEW"
  );
  // Here we want to destructure our state being passed in.
  const { title, content, location, image, price, place, from, to, bed } =
    values;
  const handleSubmit = (e) => {
    //
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //Here we are accepting the upload for photos, will use the accept to only allow images
  const hotelForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-secondary btn-block m-2 text-left">
          Image
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            value={image}
            hidden
          />
        </label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="form-control m-2"
          value={title}
        />
        <textarea
          name="content"
          onChange={handleChange}
          placeholder="Description"
          className="form-control m-2"
          value={content}
        />
        {/* Will working debugging further */}
        <ReactGoogleAutocomplete
          className="form-control m-2"
          placeholder="Location"
          defaultValue={place}
          apiKey={config}
          onPlaceSelected={(place) => {
            setValues(place.formatted_value);
          }}
          style={{ height: "50px" }}
        />
        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price"
          className="form-control m-2"
          value={price}
        />
        <input
          type="number"
          name="bed"
          onChange={handleChange}
          placeholder="Number of Beds"
          className="form-control m-2"
          value={bed}
        />
      </div>
      <DatePicker
        placeholder="From date"
        className="form-control m-2"
        onChange={(date, dateString) =>
          setValues({ ...values, from: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />
      <DatePicker
        placeholder="To date"
        className="form-control m-2"
        onChange={(date, dateString) =>
          setValues({ ...values, to: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />
      <button className="btn btn-outline primary m-2">Send to database</button>;
    </form>
  );
  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Add New Hotels</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            {hotelForm()}
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
            Image<pre>{JSON.stringify(values, null, 4)}</pre>
          </div>
        </div>
      </div>
    </>
  );
};
export default NewHotel;