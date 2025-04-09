import { useState } from "react";
import "./styles.css";

const checkboxesData = [
  {
    id: 1,
    name: "Fruits",
    Children: [
      {
        id: 2,
        name: "Citrus",
        Children: [
          {
            id: 3,
            name: "Orange",
          },
          {
            id: 4,
            name: "Lemon",
            Children: [
              {
                id: 21,
                name: "Orange",
              },
              {
                id: 22,
                name: "Lemon",
              },
            ],
          },
        ],
      },
      {
        id: 5,
        name: "Berries",
        Children: [
          {
            id: 6,
            name: "Strawberry",
          },
          {
            id: 7,
            name: "Blueberry",
          },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Tropical",
    Children: [
      {
        id: 9,
        name: "Citrus",
        Children: [
          {
            id: 10,
            name: "Orange",
          },
          {
            id: 11,
            name: "Lemon",
          },
        ],
      },
      {
        id: 12,
        name: "Berries",
        Children: [
          {
            id: 13,
            name: "Strawberry",
          },
          {
            id: 14,
            name: "Blueberry",
          },
        ],
      },
    ],
  },
];

const Checkboxes = ({ data, checked, setChecked }) => {
  return (
    <div>
      {data.map((item, index) => (
        <div key={index} className="parent">
          <input type="checkbox" checked={checked[index] || false} />
          <span>{item.name}</span>
          {item.Children && (
            <Checkboxes
              data={item.Children}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [checked, setChecked] = useState({});
  return (
    <div className="App">
      <Checkboxes
        data={checkboxesData}
        checked={checked}
        setChecked={setChecked}
      />
    </div>
  );
};

export default App;
