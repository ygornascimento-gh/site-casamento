import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OurStory from "@/components/OurStory";
import EventInfo from "@/components/EventInfo";
import RSVP from "@/components/RSVP";
import GiftList from "@/components/GiftList";
import MessageWall from "@/components/MessageWall";
import Footer from "@/components/Footer";
import FloralDivider from "@/components/FloralDivider";

const App = () => (
  <div className="min-h-screen bg-wedding-cream">
    <Navbar />
    <Hero />
    <FloralDivider />
    <OurStory />
    <FloralDivider flip />
    <EventInfo />
    <FloralDivider />
    <RSVP />
    <FloralDivider flip />
    <GiftList />
    <FloralDivider />
    <MessageWall />
    <Footer />
  </div>
);

export default App;
