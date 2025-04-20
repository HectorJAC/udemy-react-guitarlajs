import { Guitar } from "./components/Guitar"
import { Header } from "./components/Header"
import { useCart } from "./hooks/useCart"

function App() {

  const {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decrementQuantity,
    clearCart,
    cartTotal
  } = useCart()

  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decrementQuantity={decrementQuantity}
        clearCart={clearCart}
        cartTotal={cartTotal}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {
            data.map((guitar, index) => (
              <Guitar 
                key={index}
                id={guitar.id}
                price={guitar.price}
                name={guitar.name}
                description={guitar.description}
                image={guitar.image}
                addToCart={addToCart}
              />
            ))
          }
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
