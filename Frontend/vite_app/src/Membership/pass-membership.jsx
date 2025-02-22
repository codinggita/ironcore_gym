import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./pass-membership.css"

export default function PassMembershipPlans() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const navigate = useNavigate()

  const plans = [
    {
      id: "basic",
      type: "Basic",
      price: 1300,
      duration: "1 Month",
      features: [
        "Reserve up to 5 workouts at each fitness centre",
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
        "Unlimited* workout reservations",
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
        "Unlimited* workout reservations",
      ],
    },
  ]

  const handleTabClick = (tab) => {
    if (tab === 'FITFEAST') {
      navigate('/feast-membership-plans')
    }
  }

  return (
    <div className="page-container">
      <div className="header-section">
        <h1>Choose Your Perfect Plan</h1>
        <p>Transform your fitness journey with our flexible membership options</p>
        
        <div className="plan-tabs">
          <div className="tab active">FITPASS</div>
          <div className="tab" onClick={() => handleTabClick('FITFEAST')}>
            FITFEAST
          </div>
        </div>
      </div>

      <div className="membership-container">
        <div className="plans-section">
          <div className="plans-grid">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`plan-card ${selectedPlan?.id === plan.id ? "selected" : ""}`}
                onClick={() => setSelectedPlan(plan)}
              >
                <div className="plan-header">
                  <div className="plan-badge">{plan.type}</div>
                  <div className="plan-pricing">
                    <span className="currency">₹</span>
                    <span className="amount">{plan.price}</span>
                    <span className="duration">/{plan.duration}</span>
                  </div>
                </div>

                <div className="features-container">
                  <h3>What's Included</h3>
                  <ul className="features">
                    {plan.features.map((feature, index) => (
                      <li key={index}>
                        <span className="check">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`select-btn ${selectedPlan?.id === plan.id ? "selected" : ""}`}
                >
                  {selectedPlan?.id === plan.id ? "Selected" : "Choose Plan"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-section">
          <div className="cart-summary">
            <div className="cart-header">
              <h3>Order Summary</h3>
              <div className="item-count">
                {selectedPlan ? "1 ITEM" : "0 ITEMS"}
              </div>
            </div>

            {selectedPlan ? (
              <>
                <div className="selected-plan">
                  <div className="plan-type">{selectedPlan.type} Plan</div>
                  <div className="plan-price">₹{selectedPlan.price}</div>
                  <div className="per-month">
                    {selectedPlan.duration === "1 Month"
                      ? `₹${selectedPlan.price} per month`
                      : selectedPlan.duration}
                  </div>
                </div>

                <div className="total-section">
                  <div className="total-row">
                    <span>Subtotal</span>
                    <span>₹{selectedPlan.price}</span>
                  </div>
                  <div className="total-row grand-total">
                    <span>Total Amount</span>
                    <span>₹{selectedPlan.price}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <p>Select a plan to continue</p>
              </div>
            )}

            <button 
              className={`proceed-btn ${!selectedPlan ? 'disabled' : ''}`}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}