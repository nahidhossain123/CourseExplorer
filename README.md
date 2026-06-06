# Tech Stack
React Native (CLI)
TypeScript
WatermelonDB (offline local database)
Supabase (backend and sync layer)
Zustand (UI state management)
React Navigation
SQLite (via WatermelonDB)
Jest and React Native Testing Library

# Architecture Overview

The application follows an offline-first architecture where the local database is the single source of truth.

# Core Principles
UI never communicates directly with Supabase
WatermelonDB is the single source of truth
Supabase is used only for background synchronization
All reads are performed from the local database
Sync is handled through a queue-based system

# Data Flow
Supabase (Remote Backend)
→ Sync Engine (Queue Processor)
→ WatermelonDB (Local Database)
→ Zustand (UI State Layer)
→ React Native UI

## Setup Instructions

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
git clone https://github.com/your-repo/course-explorer.git
cd course-explorer
```

## Step 2: Install Packages 

### Android

```sh
npm install
# or
yarn install
```

### iOS
```sh
cd ios
pod install
cd ..
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

## Step 2: Run the app

### Android

```sh
npx react-native run-android
```

### iOS
```sh
npx react-native run-ios
```
# Supabase Setup

1. Create a Supabase project
Create a project at https://supabase.com

2. Environment variables

Create a .env file in the root directory:

```sh
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
```
3. Database configuration
Enable Row Level Security (RLS) disabled for now 
Create appropriate policies for read/write access
Ensure tables are accessible for sync operations

4. Sync behavior

Supabase is used only for:

Fetching remote updates
Pushing queued local changes

The UI never directly interacts with Supabase.

# Database Schema
```sh
create table courses (
  course_id text primary key,
  title text not null,
  description_short text not null,
  instructor_id text,
  instructor_name text not null,
  instructor_expertise_level text,
  duration_weeks int not null,
  price_usd numeric not null,
  is_premium boolean not null,
  tags text[] not null,
  rating numeric not null check (rating >= 0 and rating <= 5),
  created_at timestamptz not null default now(),
  last_updated timestamptz not null default now()
);
```
# Offline-First Strategy

The app is fully functional without internet access.

How it works
All writes are saved locally in WatermelonDB first
A sync queue entry is created for every change
When internet is available, the sync engine processes the queue
Changes are pushed to Supabase
Remote updates are pulled and merged into local database

# Future Improvements
Testing 
Background native sync service
Real-time sync using Supabase Realtime
dark/light mode

