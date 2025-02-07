'use client'

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./feast-membership.css"

export default function FeastMembershipPlans() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const navigate = useNavigate()

  const plans = [
    {
      id: "feast-basic",
      type: "FITFEAST",
      price: 1300,
      duration: "1 Month",
      features: [
        "Dedicated expert nutritionist",
        "Personalised preference- based mealtime plans",
        "Schedule call or chat anytime"
      ]
    },
    {
      id: "feast-premium",
      type: "FITFEAST",
      price: 3200,
      duration: "3 Month",
      features: [
        "Dedicated expert nutritionist",
        "Personalised preference- based mealtime plans",
        "Schedule call or chat anytime"
      ]
    },
    {
      id: "feast-premium-plus",
      type: "FITFEAST",
      price: 6400,
      duration: "6 Month",
      features: [
        "Dedicated expert nutritionist",
        "Personalised preference- based mealtime plans",
        "Schedule call or chat anytime"
      ]
    }
  ]

  const handleTabClick = (tab) => {
    if (tab === 'FITPASS') {
      navigate('/pass-membership-plans')
    }
  }

  return (
    <div className="membership-container">
      <div className="plans-section">
        <div className="plan-tabs">
          <div 
            className="tab" 
            onClick={() => handleTabClick('FITPASS')}
          >
            FITPASS
          </div>
          <div className="tab activenew">FITFEAST</div>
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
                ₹{selectedPlan.price} per month
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