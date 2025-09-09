import React from 'react'
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Your Smartest Interview Coach — Anytime, Anywhere.</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback reports
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/original-8172e268306623facb959-unscreen.gif"
          alt="Interview Illustration"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

  )
}

export default page
