import mongoose from 'mongoose';
import '../config/env.js';
import { connectDatabase } from '../config/db.js';
import constants from '../constants/constant.js';
import User from '../models/user.model.js';

const getEmailFromArgs = () => {
  const [, , rawEmail] = process.argv;
  return rawEmail?.trim().toLowerCase() || '';
};

const promoteToAdmin = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error(`No user found with email: ${email}`);
  }

  if (user.role === constants.roles.ADMIN) {
    return { alreadyAdmin: true, user };
  }

  user.role = constants.roles.ADMIN;
  await user.save();

  return { alreadyAdmin: false, user };
};

const run = async () => {
  const email = getEmailFromArgs();

  if (!email) {
    console.error('Usage: npm run make-admin -- <email>');
    process.exitCode = 1;
    return;
  }

  try {
    await connectDatabase();
    const result = await promoteToAdmin(email);

    if (result.alreadyAdmin) {
      console.log(`User is already an admin: ${result.user.email}`);
    } else {
      console.log(`User promoted to admin: ${result.user.email}`);
    }
  } catch (error) {
    console.error(`Failed to promote user: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

run();
