// src/pages/AboutPage.js
import React from 'react';

export const AboutPage = () => {
  return (
    <div className="about-page container mx-auto py-10 px-60">
      <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>

      {/* Mission */}
      <section className="mission mb-12">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg">
          We are dedicated to providing the best user experience in helping people
          connect, learn, and grow. Our mission is to simplify the way users find,
          explore, and share meaningful content and knowledge. Our platform is built
          around the concept of empowering users with knowledge and enabling them to
          discover exciting new opportunities.
        </p>
        <p className="text-lg mt-4">
          Every product we create is designed with one goal in mind: to help our users
          achieve their personal and professional goals by giving them access to the
          best tools, information, and resources available.
        </p>
      </section>

      {/* History */}
      <section className="history mb-12">
        <h2 className="text-3xl font-semibold mb-4">Our History</h2>
        <p className="text-lg">
          Our journey began in 2015 when a group of passionate developers and designers
          came together to build a platform that would change the way people share and
          access information. What started as a small project soon grew into a global
          company, serving millions of users worldwide.
        </p>
        <p className="text-lg mt-4">
          Over the years, we’ve expanded our services and technology, driven by our
          commitment to providing the best user experience possible. From our humble
          beginnings in a small office to the modern headquarters we occupy today, our
          growth is a testament to the hard work and dedication of our incredible team.
        </p>
      </section>

      {/* Team */}
      <section className="team mb-12">
        <h2 className="text-3xl font-semibold mb-4">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="team-member text-center">
            <img src="/path-to-image/member1.jpg" alt="John Doe" className="rounded-full w-32 h-32 mx-auto mb-4"/>
            <h3 className="font-semibold text-xl">John Doe</h3>
            <p className="text-gray-600">CEO & Founder</p>
            <p className="mt-2 text-gray-700">John has been leading the company since its inception, shaping the vision and strategy that have made us successful.</p>
          </div>

          <div className="team-member text-center">
            <img src="/path-to-image/member2.jpg" alt="Jane Smith" className="rounded-full w-32 h-32 mx-auto mb-4"/>
            <h3 className="font-semibold text-xl">Jane Smith</h3>
            <p className="text-gray-600">Lead Developer</p>
            <p className="mt-2 text-gray-700">Jane has led our tech team through many challenges, ensuring our platform remains innovative and user-friendly.</p>
          </div>

          <div className="team-member text-center">
            <img src="/path-to-image/member3.jpg" alt="David Brown" className="rounded-full w-32 h-32 mx-auto mb-4"/>
            <h3 className="font-semibold text-xl">David Brown</h3>
            <p className="text-gray-600">UX/UI Designer</p>
            <p className="mt-2 text-gray-700">David ensures that our platform looks and feels amazing. His attention to detail has helped create an intuitive user experience.</p>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="achievements mb-12">
        <h2 className="text-3xl font-semibold mb-4">Our Achievements</h2>
        <div className="space-y-4">
          <p className="text-lg">
            Over the years, we’ve achieved significant milestones, including:
          </p>
          <ul className="list-disc pl-6 text-lg">
            <li>Helping over 1 million users worldwide access our platform.</li>
            <li>Winning the Best User Experience Award in 2019.</li>
            <li>Securing partnerships with leading tech companies like XYZ Corp.</li>
            <li>Launching 5 major product updates in the last year.</li>
            <li>Expanding into 10 new countries in the last 2 years.</li>
          </ul>
        </div>
      </section>

      {/* Core Values */}
      <section className="values mb-12">
        <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
        <ul className="list-disc pl-6 text-lg space-y-2">
          <li>Innovation - We strive to constantly improve and innovate our services.</li>
          <li>Integrity - We value transparency and honesty in all our actions.</li>
          <li>Customer-first - Our users’ needs and satisfaction are always our priority.</li>
          <li>Collaboration - We believe in the power of teamwork and open communication.</li>
          <li>Sustainability - We are committed to making decisions that benefit both people and the planet.</li>
        </ul>
      </section>

      {/* Contact Us */}
      <section className="contact mb-12">
        <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
        <p>If you have any questions or inquiries, feel free to reach out to us:</p>
        <p className="mt-2">Email: <a href="mailto:support@example.com" className="text-blue-500">support@example.com</a></p>
        <p>Phone: +123 456 7890</p>
        <p>Address: 1234 Example St, City, Country</p>
      </section>
    </div>
  );
};
