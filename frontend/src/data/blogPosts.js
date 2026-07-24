import blog1 from '../assets/images/blogs/blog-1.avif';
import blog2 from '../assets/images/blogs/blog-2.avif';
import blog3 from '../assets/images/blogs/blog-3.avif';
import blog4 from '../assets/images/blogs/blog-4.avif';

export const blogPosts = {
    1: {
        title: 'The Future of Education: Blending Traditional and Digital Learning',
        date: 'June 28, 2026',
        author: 'Dr. Ayesha Khan',
        category: 'Education',
        readTime: '5 min read',
        views: '234',
        image: blog1,
        excerpt: 'Exploring how modern educational institutions are successfully integrating traditional teaching methods with cutting-edge technology to create more engaging learning experiences.',
        content: `
            <p>Education has undergone a remarkable transformation in recent years, particularly accelerated by global events that pushed institutions to rethink their teaching methodologies. At The Village Academia, we have embraced this change while maintaining our core commitment to quality education.</p>
            <h3>The Traditional Foundation</h3>
            <p>Traditional teaching methods have stood the test of time for good reasons. Face-to-face interactions between teachers and students create bonds that facilitate better learning.</p>
            <h3>Embracing Digital Innovation</h3>
            <p>While we cherish traditional methods, we also recognize the power of technology in enhancing the learning experience.</p>
            <blockquote>"Technology should amplify great teaching, not replace it."</blockquote>
            <h3>Looking Forward</h3>
            <p>At The Village Academia, we are proud to be pioneers in this balanced approach, helping students from KG to Class 12 achieve their academic goals.</p>
        `,
    },
    2: {
        title: 'Building Character Through Education: Our Holistic Approach',
        date: 'June 25, 2026',
        author: 'Prof. Muhammad Ahmed',
        category: 'Student Life',
        readTime: '4 min read',
        views: '189',
        image: blog2,
        excerpt: 'How The Village Academia focuses not just on academic excellence but also on developing strong moral character, leadership skills, and social responsibility in students.',
        content: `
            <p>At The Village Academia, we believe that true education goes beyond textbooks and exam scores. Our holistic approach focuses on developing well-rounded individuals.</p>
            <h3>Our Core Values</h3>
            <p>We instill honesty, respect, responsibility, compassion, and perseverance in our students through daily interactions and structured activities.</p>
            <h3>Results of Our Approach</h3>
            <p>Our holistic approach has yielded remarkable results in confidence, respect, and leadership among students.</p>
        `,
    },
    3: {
        title: "STEM Education: Preparing Students for Tomorrow's Challenges",
        date: 'June 22, 2026',
        author: 'Dr. Sana Malik',
        category: 'STEM',
        readTime: '6 min read',
        views: '156',
        image: blog3,
        excerpt: 'Our innovative STEM programs are designed to develop critical thinking, problem-solving skills, and creativity that students need to succeed in the 21st century.',
        content: `
            <p>Science, Technology, Engineering, and Mathematics (STEM) education has become increasingly important in preparing students for the modern world.</p>
            <h3>Why STEM Education Matters</h3>
            <p>STEM develops critical thinking, creativity, problem-solving, and prepares students for high-demand careers.</p>
            <h3>Our STEM Approach</h3>
            <p>We integrate STEM concepts across all age groups with age-appropriate methods and hands-on activities.</p>
            <h3>Success Stories</h3>
            <p>Our STEM approach has led to high success rates in entrance exams and science fair achievements.</p>
        `,
    },
    4: {
        title: 'How to Choose the Right Tuition Batch for Your Child',
        date: 'July 10, 2026',
        author: 'Ms. Fatima Raza',
        category: 'Admissions',
        readTime: '5 min read',
        views: '98',
        image: blog4,
        excerpt: 'A practical guide for parents on selecting the right class level, batch timing, and learning pathway at The Village Academia.',
        content: `
            <p>Choosing the right tuition batch can make a significant difference in a student's confidence, attendance, and academic progress. At The Village Academia, we offer flexible morning, afternoon, and evening sessions for students from KG to Class 12th — but the best batch depends on your child's age, school schedule, and learning goals.</p>
            <h3>Start With the Right Class Level</h3>
            <p>Before selecting a timing, confirm that your child is placed in the correct academic level. Our counselors review previous report cards and current school syllabus to recommend the most suitable batch — whether Primary, Middle, Secondary, Pre-Medical, or Pre-Engineering.</p>
            <h3>Consider Daily Routine</h3>
            <p>Students who attend school in the morning often benefit from afternoon or evening tuition batches. Working parents may prefer morning sessions for younger children. The key is consistency — a batch your child can attend regularly without fatigue.</p>
            <h3>Batch Size Matters</h3>
            <p>We keep batches small with a maximum of 15 students so every learner receives individual attention. Smaller groups help teachers identify gaps early and give students more opportunities to ask questions.</p>
            <h3>Ask About Exam Preparation Needs</h3>
            <p>If your child is preparing for board exams, MDCAT, or ECAT, mention this during enrollment. We can guide you toward batches with focused revision plans, test practice, and subject-specific support.</p>
            <blockquote>"The right batch is not just about timing — it is about matching your child's pace, goals, and learning style."</blockquote>
            <h3>Visit Us Before You Enroll</h3>
            <p>We encourage parents to visit our campus, meet our teachers, and ask about trial classes. This helps you make an informed decision and ensures your child feels comfortable from day one.</p>
            <p>Ready to get started? Contact our admissions team or fill out the online admission form — we will help you choose the best pathway for your child.</p>
        `,
    },
};

export const blogPostsList = Object.entries(blogPosts)
    .map(([id, post]) => ({
        id,
        ...post,
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

export const blogCategories = ['All', ...new Set(blogPostsList.map((post) => post.category))];
