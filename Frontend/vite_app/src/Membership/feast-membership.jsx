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
        "Personalised preference-based mealtime plans",
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
        "Personalised preference-based mealtime plans",
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
        "Personalised preference-based mealtime plans",
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
    <div className="page-container">
      <div className="header-section">
        <h1>Nutrition Plans That Work</h1>
        <p>Expert guidance for your personalized nutrition journey</p>
        
        <div className="plan-tabs">
          <div 
            className="tab"
            onClick={() => handleTabClick('FITPASS')}
          >
            FITPASS
          </div>
          <div className="tab active">FITFEAST</div>
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