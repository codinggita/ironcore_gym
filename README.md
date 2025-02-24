# Ironcore Gym

## 🌟 Project Overview
Ironcore Gym is a comprehensive gym website designed to provide users with all necessary information in one place. It eliminates the need for physical visits by offering services, trainer details, photos, and AI-generated diet plans online.

---

## 🔗 Links
- **[Design (Figma)](https://www.figma.com/design/xx6t46xMZOAVmXsBXRbliP/Ironcore-Gym?node-id=0-1&t=pgF3KdHZajE7uwKu-1)**
- **[Postman API Documentation](https://documenter.getpostman.com/view/39189278/2sAYX3rPFi)**
- **[Frontend Deployment](https://ironcore-gym-2.onrender.com)**

### 🚀 Backend Services:
- **Authentication**: [Live API](https://authentication-backend-kbui.onrender.com)
- **Blogs**: [Live API](https://blogs-backend-i6z7.onrender.com)
- **Wellness**: [Live API](https://wellness-backend-bd6i.onrender.com)

---

## 🔐 Authentication Features
### User Authentication
- Secure login with email/username and password
- "Keep me logged in" functionality for persistent sessions
- Password visibility toggle for better user experience

### Password Recovery System
- Email-based password reset
- 6-digit OTP verification
- OTP resend functionality with automatic field clearing
- New password setup with confirmation
- Success confirmation page

## 🔐 Authentication API Routes
| Endpoint                 | Method | Description  |
|--------------------------|--------|--------------|
| `/api/user/signup`       | POST   | Create an account |
| `/api/user/signIn`       | POST   | User login |
| `/api/user/forgot-password` | POST | Request password reset OTP |
| `/api/user/verify-otp`   | POST   | Verify reset password OTP |
| `/api/user/reset-password`| POST   | Set new password |

---

## 📝 Blogs API Route
| Endpoint      | Method | Description |
|--------------|--------|-------------|
| `/articles`  | GET    | Fetch blogs |

---

## 🏋️ Wellness API Routes
| Endpoint                      | Method | Description |
|--------------------------------|--------|-------------|
| `/user-details`               | POST   | Submit user details for diet plan |
| `/get-user-details/{id}`       | GET    | Retrieve user diet data |

---

## 🎯 Problem Statement
**What problem does this project solve?**
A lack of a single platform where users can find all gym-related information without physically visiting the gym.

---

## 🔍 Existing Solutions
Few platforms, like **Mepack**, provide similar services but lack a streamlined and user-friendly approach.

---

## 💡 Proposed Solution
A well-structured, intuitive gym website that provides:
- Complete gym details, including trainers, services, and reviews
- BMI calculator and AI-generated diet plans
- Gym photos and blogs to help users make informed decisions

---

## 🎨 Features
- Home Page
- Services Section
- "Why Join Us" Section
- Trainer Details
- Gym Photos
- Blog Section
- BMI Calculator & AI-Generated Diet Plans

---

## 🎯 Target Audience
- Fitness enthusiasts
- Beginners exploring gym options
- Individuals looking for AI-based health recommendations

---

## 🔥 Unique Selling Point (USP)
- All gym-related information available in one place
- AI-generated diet plans reviewed by trainers
- Time-saving, hassle-free experience

---

## 🛠️ Tools & Technologies
### Resources:
- High-quality gym-related images & content
- Trainer and gym service details

### Tools:
- **Design:** Figma
- **Frontend:** HTML, CSS, JavaScript, React
- **Backend:** Node.js, Express, MongoDB
- **Hosting:** Render

---

## 📊 Success Metrics
### Key Metrics:
- Number of website visitors
- Number of users generating diet charts

### Feedback Collection:
- User surveys
- Direct feedback from users

---

## 🚧 Risks & Challenges
| Risk | Solution |
|------|----------|
| AI-based diet plans may have inaccuracies | Use verified AI models & consult fitness experts |
| Legal compliance for diet recommendations | Validate with certified trainers & legal experts |
| Partnering with multiple gyms | Build partnerships & collaborations |

---

## 🚀 Future Plans
- Add multiple gym listings with location-based search
- Implement gym session booking
- Provide video guides for exercises

---

## 🤝 Partnerships
Opportunities exist for collaborations with gyms and fitness-related businesses.

---

## 📌 Conclusion
Ironcore Gym aims to provide a seamless online experience for fitness enthusiasts by integrating gym details, AI-generated diet plans, and interactive wellness features, ensuring accessibility and ease for all users.

---

💪 **Stay Fit, Stay Strong!**
