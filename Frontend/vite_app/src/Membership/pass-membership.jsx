"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./pass-membership.css"

export default function PassembershipPlans() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const navigate = useNavigate()

  const plans = [
    {
      id: "basic",
      type: "Basic",
      price: 1300,
      duration: "1 Month",
      features: [
        "Reserve up to 5 workouts at each fitness centre in the network",
        "Access 100+ gyms & fitness centres",
        "5,000+ workout sessions across India",
        "Multiple workout options available",
      ],
    },
    {
      id: "premium-1",
      type: "Premium",
      price: 2100,
      duration: "1 Month",
      features: [
        "Access 100+ gyms & fitness centres",
        "5,000+ workout sessions across India",
        "Multiple workout options available",
        "Unlimited* workout reservations across the partner network",
      ],
    },
    {
      id: "premium-3",
      type: "Premium",
      price: 5200,
      duration: "3 Month",
      features: [
        "Access 100+ gyms & fitness centres",
        "5,000+ workout sessions across India",
        "Multiple workout options available",
        "Unlimited* workout reservations across the partner network",
      ],
    },
  ]

  const handleTabClick = (tab) => {
    if (tab === 'FITFEAST') {
      navigate('/feast-membership-plans')
    }
  }

  return (
    <div className="membership-container">
      <div className="plans-section">
        <div className="plan-tabs">
          <div className="tab activenew">FITPASS</div>
          <div
            className="tab"
            onClick={() => handleTabClick('FITFEAST')}
          >
            FITFEAST
          </div>
        </div>

        <div className="plans-grid">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card ${selectedPlan?.id === plan.id ? "selected" : ""}`}
            >
              <div className="plan-header">
                <h2>{plan.type}</h2>
                <div className="price">₹{plan.price}/-</div>
                <div className="duration">{plan.duration}</div>
                <button
                  className={`select-btn ${selectedPlan?.id === plan.id ? "selected" : ""}`}
                  onClick={() => setSelectedPlan(plan)}
                >
                  {selectedPlan?.id === plan.id ? "Selected" : "select"}
                </button>
              </div>

              <ul className="features">
                {plan.features.map((feature, index) => (
                  <li key={index}>
                    <span className="check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-summary">
        <div className="cart-header">
          <h3>CART SUMMARY</h3>
          <div className="item-count">
            {selectedPlan ? "1 ITEM" : "0 ITEM"}
          </div>
        </div>

        {selectedPlan && (
          <>
            <div className="selected-plan">
              <div className="plan-type">{selectedPlan.type}</div>
              <div className="plan-price">₹{selectedPlan.price}/-</div>
              <div className="per-month">
                {selectedPlan.duration === "1 Month"
                  ? `₹${selectedPlan.price} per month`
                  : selectedPlan.duration}
              </div>
            </div>

            <div className="total-section">
              <div className="total-row">
                <span>Total</span>
                <span>₹{selectedPlan.price}</span>
              </div>
              <div className="total-row">
                <span>Payable Amount</span>
                <span>₹{selectedPlan.price}</span>
              </div>
            </div>
          </>
        )}

        <button className="proceed-btn">
          Proceed
        </button>
      </div>
    </div>
  )
}