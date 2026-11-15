import { useCallback, useState } from "react";

// Inline placeholder keeps the demo functional without committing a binary image asset.
const productImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360' viewBox='0 0 640 360'%3E%3Crect width='640' height='360' fill='%23f4f4f5'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='28' fill='%236b7280'%3ESwag Store Product Image%3C/text%3E%3C/svg%3E";

export function ProductRow({ product, onChange }) {
  const [inventoryDetails, setInventoryDetails] = useState(null);

  const fetchInventoryDetails = useCallback(() => {
    fetch(`/api/products/${product.id}`)
      .then((response) => response.json())
      .then(({ inventory }) => setInventoryDetails(inventory))
      .then(() => onChange());
  }, [product.id, onChange]);

  const uploadImage = useCallback(() => {
    fetch(productImage)
      .then((r) => r.blob())
      .then((fileBlob) => {
        const file = new File([fileBlob], "swag-product-placeholder.svg", {
          type: "image/svg+xml",
        });

        const formData = new FormData();
        formData.append("file", file);

        fetch(`/api/products/${product.id}/image`, {
          method: "POST",
          body: formData,
        }).then(() => onChange());
      });
  }, [product.id, onChange]);

  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>{product.upc}</td>
      <td>
        {inventoryDetails ? (
          <>
            {inventoryDetails.error ? (
              <span className="error">{inventoryDetails.message}</span>
            ) : (
              <span>{inventoryDetails.quantity}</span>
            )}
          </>
        ) : (
          <button className="smaller" onClick={fetchInventoryDetails}>
            Fetch
          </button>
        )}
      </td>
      <td>
        {product.has_image ? (
          <img src={`/api/products/${product.id}/image`} alt={product.name} />
        ) : (
          <button className="smaller" onClick={uploadImage}>
            Upload
          </button>
        )}
      </td>
    </tr>
  );
}
