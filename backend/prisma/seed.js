const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const [bibleCount, prayerCount, ptsrCount] = await Promise.all([
    prisma.biblePost.count(),
    prisma.prayerPost.count(),
    prisma.ptsrPost.count(),
  ]);

  if (bibleCount === 0) {
    await prisma.biblePost.createMany({
      data: [
        { title: 'Псалом 23', description: 'Господь - Пастир мій, тому в недостатку не буду.' },
        { title: 'Івана 3:16', description: 'Бо так Бог полюбив світ, що Сина Свого Однородженого дав...' },
      ],
    });
  }

  if (prayerCount === 0) {
    await prisma.prayerPost.createMany({
      data: [
        { title: 'Ранкова молитва', description: 'Господи, благослови цей день і направ мене.' },
        { title: 'Молитва за родину', description: 'Боже, бережи мою сімʼю, дай мир і любов.' },
      ],
    });
  }

  if (ptsrCount === 0) {
    await prisma.ptsrPost.createMany({
      data: [
        {
          title: 'ПТСР: перші кроки допомоги',
          sections: [
            { title: 'Дихання', text: 'Повільно вдихайте 4 секунди, видихайте 6 секунд.' },
            { title: 'Заземлення', text: 'Назвіть 5 речей, які ви бачите поруч.' },
          ],
        },
      ],
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
