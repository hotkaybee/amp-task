import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data (optional - be careful in production!)
  console.log('🧹 Cleaning existing data...');
  await prisma.booking.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  // Create sample users
  console.log('👥 Creating sample users...');
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john.doe@example.com',
        name: 'John Doe'
      }
    }),
    prisma.user.create({
      data: {
        email: 'jane.smith@example.com',
        name: 'Jane Smith'
      }
    }),
    prisma.user.create({
      data: {
        email: 'bob.wilson@example.com',
        name: 'Bob Wilson'
      }
    }),
    prisma.user.create({
      data: {
        email: 'alice.brown@example.com',
        name: 'Alice Brown'
      }
    }),
    prisma.user.create({
      data: {
        email: 'charlie.davis@example.com',
        name: 'Charlie Davis'
      }
    })
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Create sample events
  console.log('🎪 Creating sample events...');
  const events = await Promise.all([
    prisma.event.create({
      data: {
        name: 'Tech Conference 2024',
        total_seats: 100
      }
    }),
    prisma.event.create({
      data: {
        name: 'Music Concert - Rock Night',
        total_seats: 500
      }
    }),
    prisma.event.create({
      data: {
        name: 'JavaScript Workshop',
        total_seats: 30
      }
    }),
    prisma.event.create({
      data: {
        name: 'Startup Pitch Competition',
        total_seats: 150
      }
    }),
    prisma.event.create({
      data: {
        name: 'Art Exhibition Opening',
        total_seats: 75
      }
    })
  ]);

  console.log(`✅ Created ${events.length} events`);

  // Create some sample bookings to demonstrate the system
  console.log('🎫 Creating sample bookings...');
  const bookings = await Promise.all([
    prisma.booking.create({
      data: {
        event_id: events[0].id, // Tech Conference
        user_id: users[0].email // john.doe@example.com
      }
    }),
    prisma.booking.create({
      data: {
        event_id: events[1].id, // Music Concert
        user_id: users[1].email // jane.smith@example.com
      }
    }),
    prisma.booking.create({
      data: {
        event_id: events[2].id, // JavaScript Workshop
        user_id: users[2].email // bob.wilson@example.com
      }
    })
  ]);

  console.log(`✅ Created ${bookings.length} sample bookings`);

  // Display summary
  console.log('\n📊 Seeding Summary:');
  console.log('==================');
  console.log(`👥 Users: ${users.length}`);
  console.log(`🎪 Events: ${events.length}`);
  console.log(`🎫 Bookings: ${bookings.length}`);
  
  console.log('\n🎯 Sample Data for Testing:');
  console.log('===========================');
  console.log('Users (use email as user_id):');
  users.forEach(user => {
    console.log(`  - ${user.email} (${user.name})`);
  });
  
  console.log('\nEvents:');
  events.forEach(event => {
    console.log(`  - ID: ${event.id}, Name: "${event.name}", Seats: ${event.total_seats}`);
  });

  console.log('\n🚀 Database seeded successfully!');
  console.log('You can now test the booking API with the sample data above.');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
