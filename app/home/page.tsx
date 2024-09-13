"use client";
import React from "react";
import Image from "next/image"; // Use 'next/image' for optimized images in Next.js
import expense from "../assets/expense.jpg";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const handleStart = () => {
    try {
      router.push("/login");
    } catch (error) {
      console.error("Navigation failed:", error);
    }
  };

  return (
    <div className="h-[80vh] flex flex-col justify-center items-center p-6">
      <div className="flex flex-col md:flex-row items-center gap-6 justify-evenly w-full h-full">
        {/* Left Side */}
        <div className="flex flex-col items-start max-w-lg text-center md:text-left mb-11">
          <h1 className="text-4xl font-bold mb-4">
            Expense Tracker Application
          </h1>
          <p className="text-lg text-gray-400">
            Track your expenses in an efficient and organized way. Our
            application helps you keep tabs on your spending, set budgets, and
            make informed financial decisions. With intuitive charts and
            easy-to-use features, managing your finances has never been easier.
          </p>
          <Button variant="pinkGradient" className="mt-6" onClick={handleStart}>
            Get Started
          </Button>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-between mt-8 md:mt-0">
          <Image
            src={expense}
            alt="Expense Tracker"
            width="0" // Ensure these dimensions match the actual image size
            height="0"
            className="w-auto h-[400px] rounded-lg shadow-lg"
            priority
            // Add this line
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
