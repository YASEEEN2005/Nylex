"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Basic",
    subtitle: "For small businesses",
    price: "$499",
    period: "one time",
    popular: false,
    features: [
      "Responsive Website",
      "Basic SEO",
      "Contact Form",
      "1 Month Support",
    ],
  },
  {
    name: "Standard",
    subtitle: "For growing businesses",
    price: "$999",
    period: "one time",
    popular: true,
    features: [
      "Custom Design",
      "Advanced SEO",
      "CMS Integration",
      "3 Months Support",
    ],
  },
  {
    name: "Premium",
    subtitle: "For growing businesses",
    price: "$1999",
    period: "one time",
    popular: false,
    features: [
      "Custom Development",
      "Third-party Integration",
      "Advanced Features",
      "6 Months Support",
    ],
  },
];

export default function Pricing() {
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="pricing"
      className="relative z-10 w-full bg-[#f8fafc] text-primary-black py-20 sm:py-28 lg:py-32 font-inter border-t border-neutral-200/80"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px]">
        {/* Header */}
        <div className="text-center lg:text-left pb-12 sm:pb-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-medium uppercase tracking-tight text-neutral-950">
              SIMPLE PRICING
            </h2>
            <p className="mt-3 font-inter text-base sm:text-lg text-neutral-600">
              Flexible plans for different needs.
            </p>
          </motion.div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {plans.map((plan, index) => {
            const isPopular = plan.popular;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: isPopular ? -12 : -8 }}
                className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 md:p-9 transition-all duration-300 ${
                  isPopular
                    ? "bg-[#00507D] text-white shadow-xl md:-translate-y-2 border border-[#00507D] hover:shadow-2xl"
                    : "bg-white text-neutral-950 border border-neutral-200/90 shadow-xs hover:border-[#00507D]/40 hover:shadow-xl"
                }`}
              >
                {/* Popular Tag */}
                {isPopular && (
                  <div className="absolute top-6 right-6 rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold text-white uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <div>
                  {/* Plan Name & Subtitle */}
                  <h3 className="font-manrope text-2xl font-extrabold">{plan.name}</h3>
                  <p
                    className={`font-inter text-xs sm:text-sm mt-1 ${
                      isPopular ? "text-blue-100" : "text-neutral-500"
                    }`}
                  >
                    {plan.subtitle}
                  </p>

                  {/* Price */}
                  <div className="mt-6 flex items-baseline gap-2 pb-6 border-b border-current/15">
                    <span className="font-manrope text-4xl sm:text-5xl font-extrabold">
                      {plan.price}
                    </span>
                    <span
                      className={`text-xs ${
                        isPopular ? "text-blue-100" : "text-neutral-500"
                      }`}
                    >
                      {plan.period}
                    </span>
                  </div>

                  {/* Feature List */}
                  <ul className="mt-6 space-y-3.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-xs sm:text-sm font-medium">
                        <Check
                          className={`h-4 w-4 shrink-0 ${
                            isPopular ? "text-[#53e6ff]" : "text-[#00507D]"
                          }`}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="mt-8 pt-4">
                  <a
                    href="#contact"
                    onClick={(e) => handleScrollTo(e, "contact")}
                    className={`flex w-full items-center justify-center gap-2 rounded-full py-3.5 px-6 text-sm font-semibold transition-all duration-200 ${
                      isPopular
                        ? "bg-white text-[#00507D] hover:bg-neutral-100 shadow-md"
                        : "border border-neutral-300 bg-white text-neutral-800 hover:border-[#00507D] hover:bg-[#00507D] hover:text-white"
                    }`}
                  >
                    <span>Get Started</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
