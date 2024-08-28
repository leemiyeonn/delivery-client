import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../contexts/CartContext";
import { CartProduct } from "../types/CartProduct";

const EmptyCart: React.FC = () => (
  <div className="p-6 text-center">
    <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
  </div>
);

interface CartProductProps {
  product: CartProduct;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartProductComponent: React.FC<CartProductProps> = ({
  product,
  onQuantityChange,
  onRemove,
}) => {
  const defaultProductImage = "/images/default/default-product-image.png";

  const getImageSrc = (product: CartProduct) => {
    return product.image && product.image.trim() !== ""
      ? product.image
      : defaultProductImage;
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-4">
      <div className="flex items-center">
        <div className="w-24 h-24 mr-6 relative">
          <Image
            src={getImageSrc(product)}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = defaultProductImage;
            }}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h3>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-gray-900 font-bold mt-2">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => onQuantityChange(product.id, product.quantity - 1)}
            className="px-3 py-1 text-gray-600 hover:text-gray-800"
            disabled={product.quantity <= 1}
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={product.quantity}
            onChange={(e) =>
              onQuantityChange(product.id, parseInt(e.target.value, 10))
            }
            className="w-16 text-center border border-gray-300 rounded-md mx-2"
          />
          <button
            onClick={() => onQuantityChange(product.id, product.quantity + 1)}
            className="px-3 py-1 text-gray-600 hover:text-gray-800"
          >
            +
          </button>
          <button
            onClick={() => onRemove(product.id)}
            className="ml-4 text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

const Cart: NextPage = () => {
  const { items, updateQuantity, removeFromCart } = useCart();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen">
      <header>
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">🛒 Your Cart</h1>
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {items.length === 0 && <EmptyCart />}
        {items.length > 0 && (
          <div className="space-y-4">
            {items.map((item) => (
              <CartProductComponent
                key={item.id}
                product={item}
                onQuantityChange={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-semibold">Total:</span>
                <span className="text-2xl font-bold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <button className="w-full bg-purple-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-purple-600 transition duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
