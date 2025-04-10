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
          { id: 3, name: "Orange" },
          { id: 4, name: "Lemon" },
        ],
      },
      {
        id: 5,
        name: "Berries",
        Children: [
          {
            id: 6,
            name: "Strawberry",
            Children: [
              {
                id: 20,
                name: "Citrus",
                Children: [
                  { id: 23, name: "Orange" },
                  { id: 24, name: "Lemon" },
                ],
              },
              {
                id: 25,
                name: "Berries",
                Children: [
                  { id: 26, name: "Strawberry" },
                  { id: 27, name: "Blueberry" },
                ],
              },
            ],
          },
          { id: 7, name: "Blueberry" },
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
          { id: 10, name: "Orange" },
          { id: 11, name: "Lemon" },
        ],
      },
      {
        id: 12,
        name: "Berries",
        Children: [
          { id: 13, name: "Strawberry" },
          { id: 14, name: "Blueberry" },
        ],
      },
    ],
  },
];

const Checkboxes = ({ data, checked, setChecked }) => {
  const handleChange = (isChecked, node) => {
    setChecked((prev) => {
      const newState = { ...prev, [node.id]: isChecked };

      const updateChildren = (node) => {
        node.Children?.forEach((child) => {
          newState[child.id] = isChecked;
          child.Children && updateChildren(child);
        });
      };
      updateChildren(node);

      const verifyChecked = (node) => {
        if (!node.Children) return newState[node.id] || false;

        const allChildrenChecked = node.Children?.every((child) =>
          verifyChecked(child)
        );
        newState[node.id] = allChildrenChecked;
        return allChildrenChecked;
      };
      // checkboxesData.forEach((node) => verifyChecked(node));

      const traverseAndVerify = (nodes) => {
        nodes.forEach((node) => {
          verifyChecked(node);
          if (node.Children) {
            traverseAndVerify(node.Children);
          }
        });
      };

      traverseAndVerify(checkboxesData);

      return newState;
    });
  };

  return (
    <div>
      {data.map((node) => (
        <div key={node.id} className="parent">
          <input
            type="checkbox"
            checked={checked[node.id] || false}
            onChange={(e) => handleChange(e.target.checked, node)}
          />
          <span>{node.name}</span>
          {node.Children && (
            <Checkboxes
              data={node.Children}
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
