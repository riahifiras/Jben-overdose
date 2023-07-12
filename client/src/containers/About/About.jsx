import { cheese } from "../../Images"
import './About.css'

const About = () => {
  return (
    <div className="width h-screen flex flex-row items-center bg-color1 justify-around">
        <p className="text-black w-1/3 text-4xl">
        Welcome to <span className="text-color5 font-semibold text-start">yes</span>, your go-to destination for heavenly cheesecakes. We are a passionate team dedicated to creating the most mouthwatering, indulgent cheesecakes you'll ever taste. Each cake is lovingly handcrafted using the finest ingredients, resulting in a symphony of flavors that will leave you craving for more. Whether you're celebrating a special occasion or simply treating yourself, we invite you to experience the sheer delight of our artisanal cheesecakes.
        </p>
        <img src={cheese} alt="" />
    </div>
  )
}

export default About