export const TESTIMONIAL_IMAGES = {
  boy: "boy-testimonial.jpg",
  girl: "girl-testimonial.jpg",
  girl2: "girl2-testimonial.jpg",
};

export type TestimonialImage = keyof typeof TESTIMONIAL_IMAGES;

export interface Testimonial {
  id: string;
  image: TestimonialImage;
  name: string;
  profession: string;
  rating: string;
  text: string;
}
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "michael",
    image: "boy",
    name: "Michael Wong",
    profession: "Footballer",
    rating: "4.9",
    text: "Learning a new language has never been easier! The app's interactive lessons fit perfectly into my busy schedule, helping me connect with teammates from around the world.",
  },
  {
    id: "avril",
    image: "girl",
    name: "Avril Song",
    profession: "Project manager",
    rating: "4.8",
    text: "The personalized approach to learning is fantastic. I was able to focus on the specific skills I needed for my job, and now I can communicate confidently with international clients.",
  },
  {
    id: "jeane",
    image: "girl2",
    name: "Jeane Wood",
    profession: "Philosophy student",
    rating: "5.0",
    text: "This app is a game-changer! The lessons are engaging and really helped me grasp complex language concepts quickly. I’m now exploring philosophical texts in their original language.",
  },
];
