import ReactGoogleAutocomplete from "react-google-autocomplete";
import { DatePicker, Select } from "antd";
import moment from "moment";
import "antd/dist/antd.css";
const { Option } = Select;

const config = process.env.REACT_APP_GOOGLEPLACES_API_KEY;

const HotelCreateForm = ({
  values,
  setValues,
  handleChange,
  handleImageChange,
  handleSubmit,
  location,
  setLocation,
}) => {
  const { title, description, price } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label
          id="img22"
          className="btn btn-outline-secondary btn-block m-2 text-left"
        >
          Image
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
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
          name="description"
          onChange={handleChange}
          placeholder="Description"
          className="form-control m-2"
          value={description}
        />
        <input
          className="form-control m-2"
          placeholder="Location"
          setLocation={setLocation}
          name={location}
          onChange={handleChange}
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

        <Select
          onChange={(value) => setValues({ ...values, bed: value })}
          className="w-100 m-2"
          size="large"
          placeholder="Number of beds"
        >
          <Option key={1}>{1}</Option>
          <Option key={2}>{2}</Option>
          <Option key={3}>{3}</Option>
          <Option key={4}>{4}</Option>
        </Select>
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
      <div className="text-center">
        <button id="save22" className="btn btn-outline-primary m-2">
          Save
        </button>
      </div>
    </form>
  );
};

export default HotelCreateForm;
