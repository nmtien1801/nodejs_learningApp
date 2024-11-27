"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Course", // 6 data
      [
        {
          name: "UX Foundation",
          title: "Introduction to User Experiece Design",
          description:
            "Convallis in semper laoreet nibh leo. Vivamus malesuada ipsum pulvinar non rutrum risus dui, risus. Purus massa velit iaculis tincidunt tortor, risus, scelerisque risus... See more",
          image: "",
          state: 0, // chưa bắt đầu,
          descProject: "Web development project on front-end technologies ...",
          categoryID: 1,
          price: 10,
        },
        {
          name: "Design  Basics",
          title: "Introduction to User Experiece Design",
          description:
            "Convallis in semper laoreet nibh leo. Vivamus malesuada ipsum pulvinar non rutrum risus dui, risus. Purus massa velit iaculis tincidunt tortor, risus, scelerisque risus... See more",
          image: "",
          state: 0, // chưa bắt đầu
          descProject: "Web development project on front-end technologies ...",
          categoryID: 1,
          price: 12,
        },
        {
          name: "Digistal Sketching",
          title: "Introduction to User Experiece Design",
          description:
            "Convallis in semper laoreet nibh leo. Vivamus malesuada ipsum pulvinar non rutrum risus dui, risus. Purus massa velit iaculis tincidunt tortor, risus, scelerisque risus... See more",
          image: "",
          state: 1, // đang học
          descProject: "Web development project on front-end technologies ...",
          categoryID: 1,
          price: 13,
        },
        {
          name: "Digital Portrait",
          title: "Introduction to User Experiece Design",
          description:
            "Convallis in semper laoreet nibh leo. Vivamus malesuada ipsum pulvinar non rutrum risus dui, risus. Purus massa velit iaculis tincidunt tortor, risus, scelerisque risus... See more",
          image: "",
          state: 2, // đã hoàn thành
          descProject: "Web development project on front-end technologies ...",
          categoryID: 1,
          price: 14,
        },
        {
          name: "Web Design",
          title: "Introduction to User Experiece Design",
          description:
            "Convallis in semper laoreet nibh leo. Vivamus malesuada ipsum pulvinar non rutrum risus dui, risus. Purus massa velit iaculis tincidunt tortor, risus, scelerisque risus... See more",
          image: "",
          state: 4, // đã lưu trữ -> chưa mua
          descProject: "Web development project on front-end technologies ...",
          categoryID: 1,
          price: 15,
        },
        {
          name: "PHP in One Click",
          title: "Introduction to User Experiece Design",
          description:
            "Convallis in semper laoreet nibh leo. Vivamus malesuada ipsum pulvinar non rutrum risus dui, risus. Purus massa velit iaculis tincidunt tortor, risus, scelerisque risus... See more",
          image: "",
          state: 3, // chưa lưu trữ -> chưa mua
          descProject: "Web development project on front-end technologies ...",
          categoryID: 1,
          price: 16,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

// npx sequelize-cli db:seed --seed seeder_course.js
