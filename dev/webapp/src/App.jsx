import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import sampleProducts from "./sample-products.json";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    Number(value) || 0,
  );

function productArtwork(name) {
  const value = name.toLowerCase();
  if (value.includes("hoodie") || value.includes("shirt") || value.includes("tee")) return "👕";
  if (value.includes("mug") || value.includes("bottle") || value.includes("drink")) return "☕";
  if (value.includes("cap") || value.includes("hat")) return "🧢";
  if (value.includes("sticker")) return "🐳";
  return "🎁";
}

function App() {
  const [catalog, setCatalog] = useState(null);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);

  const fetchCatalog = useCallback(() => {
    setErrorOccurred(false);
    fetch("/api/products")
      .then((response) => {
        if (!response.ok) throw new Error("Catalog request failed");
        return response.json();
      })
      .then(setCatalog)
      .catch(() => setErrorOccurred(true));
  }, []);

  const createProduct = useCallback(() => {
    if (!catalog) return;
    const body = {
      price: 100 + Math.floor(Math.random() * 100),
      upc: 100000000000 + catalog.length + 1,
      name:
        catalog.length < sampleProducts.length
          ? sampleProducts[catalog.length].name
          : `New Swag Item #${catalog.length + 1}`,
      description:
        catalog.length < sampleProducts.length
          ? sampleProducts[catalog.length].description
          : "A fresh addition to the Docker Swag Store collection.",
    };

    fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then(fetchCatalog);
  }, [catalog, fetchCatalog]);

  useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog]);

  const cartItems = useMemo(() => {
    if (!catalog) return [];
    return Object.entries(cart)
      .map(([id, quantity]) => {
        const product = catalog.find((item) => String(item.id) === id);
        return product ? { ...product, quantity } : null;
      })
      .filter(Boolean);
  }, [catalog, cart]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
    0,
  );

  const addToCart = (product) => {
    setCart((current) => ({
      ...current,
      [product.id]: (current[product.id] || 0) + 1,
    }));
  };

  const changeQuantity = (id, delta) => {
    setCart((current) => {
      const nextQuantity = (current[id] || 0) + delta;
      const next = { ...current };
      if (nextQuantity <= 0) delete next[id];
      else next[id] = nextQuantity;
      return next;
    });
  };

  return (
    <div className="store-shell">
      <header className="store-header">
        <a className="brand" href="/" aria-label="Docker Swag Store home">
          <span className="brand-mark">🐳</span>
          <span>DOCKER <b>SWAG STORE</b></span>
        </a>
        <div className="header-actions">
          <button className="text-button" onClick={fetchCatalog}>Refresh</button>
          <button className="cart-button" onClick={() => setCartOpen((open) => !open)}>
            Cart <span>{cartCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">THE COMMUNITY COLLECTION</p>
            <h1>Wear the whale.<br /><span>Share the journey.</span></h1>
            <p>Gear for builders, makers, and everyone shipping containers.</p>
            <a className="hero-link" href="#products">Explore the collection <span>↘</span></a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <span className="hero-whale">🐳</span>
            <span className="hero-sticker">BUILD<br />SHIP<br />REPEAT</span>
          </div>
        </section>

        <section className="collection-heading" id="products">
          <div>
            <p className="eyebrow">FIND YOUR NEXT FAVORITE</p>
            <h2>Docker essentials</h2>
          </div>
          <span className="item-count">{catalog ? catalog.length : "…"} items</span>
        </section>

        {catalog ? (
          catalog.length ? (
            <section className="product-grid">
              {catalog.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-visual">
                    {product.has_image ? (
                      <img
                        src={`/api/products/${product.id}/image`}
                        alt={product.name}
                        loading="lazy"
                      />
                    ) : (
                      <div className="product-placeholder" aria-label="Product image coming soon">
                        <span>{productArtwork(product.name)}</span>
                        <small>DOCKER SWAG</small>
                      </div>
                    )}
                    <span className="product-tag">COMMUNITY PICK</span>
                  </div>
                  <div className="product-info">
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                    </div>
                    <div className="product-buy">
                      <strong>{formatPrice(product.price)}</strong>
                      <button onClick={() => addToCart(product)}>Add to cart <span>+</span></button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          ) : (
            <p className="empty-state">The collection is getting ready. Add the first swag item to get started.</p>
          )
        ) : (
          <p className="empty-state">
            {errorOccurred
              ? "Could not load the catalog. Check that the API and supporting services are running."
              : "Loading the collection…"}
          </p>
        )}

        <section className="store-note">
          <span>🐳</span>
          <p><b>Made for the community.</b> This is a workshop demo catalog. Add-to-cart is a local UI interaction, not a real order or payment.</p>
        </section>
      </main>

      <footer className="store-footer">
        <span>DOCKER SWAG STORE</span>
        <span>Built for the builders.</span>
        <button className="text-button" onClick={createProduct} disabled={!catalog}>＋ Add demo item</button>
      </footer>

      {cartOpen && (
        <div className="cart-backdrop" role="presentation" onClick={() => setCartOpen(false)}>
          <aside className="cart-panel" role="dialog" aria-modal="true" aria-label="Shopping cart" onClick={(event) => event.stopPropagation()}>
            <div className="cart-heading">
              <div><p className="eyebrow">YOUR SELECTION</p><h2>Your cart <span>({cartCount})</span></h2></div>
              <button className="close-cart" onClick={() => setCartOpen(false)} aria-label="Close cart">×</button>
            </div>
            {cartItems.length ? (
              <>
                <div className="cart-lines">
                  {cartItems.map((item) => (
                    <div className="cart-line" key={item.id}>
                      <div className="cart-thumb">{productArtwork(item.name)}</div>
                      <div className="cart-line-copy"><b>{item.name}</b><span>{formatPrice(item.price)}</span>
                        <div className="quantity-control">
                          <button onClick={() => changeQuantity(item.id, -1)} aria-label={`Remove one ${item.name}`}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => changeQuantity(item.id, 1)} aria-label={`Add one ${item.name}`}>+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-total"><span>Demo subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
                <p className="cart-disclaimer">Demo only. No checkout, payment, or order submission is connected.</p>
              </>
            ) : (
              <div className="cart-empty"><span>🛍️</span><b>Your cart is empty</b><p>Add something from the collection to get started.</p></div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
