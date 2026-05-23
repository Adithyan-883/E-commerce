const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => {
  return (
    <div className="rounded-[1.5rem] border border-[#FACC15]/30 bg-white p-5 shadow-sm shadow-[#22c622]/5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="h-24 w-24 overflow-hidden rounded-3xl bg-slate-100">
            <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#1E3A1A]">{item.title}</h3>
            {item.packLabel && <p className="text-sm font-medium text-[#1E3A1A]">{item.packLabel}</p>}
            <p className="text-sm text-[#475569]">{item.category}</p>
            <p className="mt-3 text-base font-bold text-[#22c622]">₹{(item.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#A78B15]/20 bg-[#FACC15]/10 px-3 py-2">
            <button type="button" onClick={onDecrement} className="text-xl font-semibold text-[#22c622]">−</button>
            <span className="min-w-[2rem] text-center text-sm font-semibold text-[#1E3A1A]">{item.quantity}</span>
            <button type="button" onClick={onIncrement} className="text-xl font-semibold text-[#22c622]">+</button>
          </div>
          <button onClick={onRemove} className="rounded-full bg-[#FACC15] px-4 py-2 text-sm font-semibold text-[#1E3A1A] transition duration-300 hover:bg-[#A78B15] hover:text-white">
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
