import { motion } from 'framer-motion'

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-[1.75rem] border border-[#FACC15]/30 bg-white shadow-lg shadow-[#22c622]/5"
    >
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <img loading="lazy" src={category.image} alt={category.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="space-y-3 p-6">
        <h3 className="text-xl font-semibold text-[#1E3A1A]">{category.title}</h3>
        <p className="text-sm leading-6 text-[#475569]">{category.description}</p>
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#22c622]">
          <span>Explore</span>
          <span className="text-[#A78B15]">→</span>
        </div>
      </div>
    </motion.div>
  )
}

export default CategoryCard
