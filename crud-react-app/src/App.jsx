import { useState, useEffect } from "react";

const API_URL = "http://13.234.111.81:5000/items";

function App() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");

    // Fetch all items
    const loadItems = async () => {
        const res = await fetch(API_URL);
        const data = await res.json();
        setItems(data);
    };

    // Add item
    const addItem = async () => {
        if (!newItem.trim()) return alert("Please enter a name");

        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newItem }),
        });
        setNewItem("");
        loadItems();
    };

    // Update item
    const updateItem = async (id) => {
        const newName = prompt("Enter new name:");
        if (!newName) return;

        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newName }),
        });
        loadItems();
    };

    // Delete item
    const deleteItem = async (id) => {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        loadItems();
    };

    useEffect(() => {
        loadItems();
    }, []);

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Item Manager</h1>

            <input
                type="text"
                value={newItem}
                placeholder="Enter item name"
                onChange={(e) => setNewItem(e.target.value)}
                style={{ padding: "6px", marginRight: "5px" }}
            />
            <button onClick={addItem} style={{ padding: "6px 10px" }}>
                Add Item
            </button>

            <h2>Items</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {items.map((item) => (
                    <li key={item.id} style={{ margin: "8px 0", display: "flex", alignItems: "center" }}>
                        <span style={{ flex: 1 }}>{item.name}</span>
                        <button onClick={() => updateItem(item.id)} style={{ marginLeft: "5px" }}>
                            Update
                        </button>
                        <button onClick={() => deleteItem(item.id)} style={{ marginLeft: "5px" }}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
