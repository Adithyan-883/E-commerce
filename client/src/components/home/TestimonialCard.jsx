import { motion } from 'framer-motion'

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.article
      whileHover={{ scale: 1.01 }}
      className="rounded-[1.75rem] border border-[#FACC15]/35 bg-white p-8 shadow-xl shadow-[#22c622]/5"
    >
      <p className="text-lg leading-8 text-[#334155]">“{testimonial.quote}”</p>
      <div className="mt-8">
        <h4 className="text-base font-semibold text-[#1E3A1A]">{testimonial.name}</h4>
        <p className="text-sm text-[#475569]">{testimonial.role}</p>
      </div>
    </motion.article>
  )
}

export default TestimonialCard
