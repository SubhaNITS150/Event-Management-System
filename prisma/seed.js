import { PrismaClient } from "../src/generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  // ✅ Find Round 1 (already exists)
  const round1 = await prisma.round.findFirst({
    where: { round_number: 1 },
  });

  if (!round1) {
    throw new Error("❌ Round 1 not found. Please create Round 1 first.");
  }

  console.log(`✅ Found Round 1 with ID: ${round1.round_id}`);

  // ✅ Coding Problems for Round 1
  const codingProblems = [
    {
      question_text: "Write a function to calculate the factorial of a number.",
      problem_statement: `
Implement a function factorial(n) that returns the factorial of the integer n.
Input: integer n
Output: integer (n!)
Example:
Input: 5
Output: 120
      `,
      testcases: [
        { input_data: "5", expected_output: "120" },
        { input_data: "0", expected_output: "1" },
        { input_data: "3", expected_output: "6" },
      ],
    },
    {
      question_text:
        "Write a program to check whether a given number is prime or not.",
      problem_statement: `
Implement a function isPrime(n) that returns true if n is prime, otherwise false.
Input: integer n
Output: boolean
Example:
Input: 7
Output: true
      `,
      testcases: [
        { input_data: "2", expected_output: "true" },
        { input_data: "4", expected_output: "false" },
        { input_data: "13", expected_output: "true" },
      ],
    },
    {
      question_text:
        "Write a function to reverse a string without using built-in reverse methods.",
      problem_statement: `
Implement a function reverseString(s) that returns the reversed version of the input string.
Input: string s
Output: reversed string
Example:
Input: hello
Output: olleh
      `,
      testcases: [
        { input_data: "hello", expected_output: "olleh" },
        { input_data: "abcd", expected_output: "dcba" },
        { input_data: "racecar", expected_output: "racecar" },
      ],
    },
    {
      question_text:
        "Write a function to find the largest element in an array.",
      problem_statement: `
Implement a function findMax(arr) that returns the largest number in the given array.
Input: array of integers
Output: integer (largest element)
Example:
Input: [2, 8, 4, 1, 9]
Output: 9
      `,
      testcases: [
        { input_data: "[2,8,4,1,9]", expected_output: "9" },
        { input_data: "[5,5,5]", expected_output: "5" },
        { input_data: "[10,-1,0,7]", expected_output: "10" },
      ],
    },
    {
      question_text: "Write a function to check if a string is a palindrome.",
      problem_statement: `
Implement a function isPalindrome(s) that returns true if the given string is a palindrome, otherwise false.
Input: string s
Output: boolean
Example:
Input: madam
Output: true
      `,
      testcases: [
        { input_data: "madam", expected_output: "true" },
        { input_data: "hello", expected_output: "false" },
        { input_data: "racecar", expected_output: "true" },
      ],
    },
  ];

  // ✅ Insert each coding question into Question + CodingProblem + TestCase tables
  for (const q of codingProblems) {
    const question = await prisma.question.create({
      data: {
        round_id: round1.round_id,
        question_text: q.question_text,
        coding_problem: {
          create: {
            problem_statement: q.problem_statement,
            testcases: {
              create: q.testcases,
            },
          },
        },
      },
      include: {
        coding_problem: {
          include: { testcases: true },
        },
      },
    });

    console.log(`✅ Inserted coding problem: ${question.question_text}`);
  }

  console.log("🎯 All coding problems added successfully!");
}

// ✅ Execute safely
main()
  .catch((e) => {
    console.error("❌ Error seeding coding problems:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
