import { faker } from "@faker-js/faker";

export default function handler(req, res) {
    try {

      const {text} = req.body;
      
      let dummyQuestions = Array.from({ length: 50 }, (_, i) => ({
        question: `Question number ${i + 1}`,
        answer: generateAnswer(),
      }));
      
      const responseData = {dummyQuestions, text};
      res.status(200).json(responseData);
  
    } catch (error) {
      console.error({ message: error.message });
    }
}

function generateAnswer() {
  const answerLength = Math.floor(Math.random() * 200) + 1;
  return faker.lorem.words(answerLength);
}



