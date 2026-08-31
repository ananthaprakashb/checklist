function taskObject(activityId, task, index) {
  const [id, title, subtasks] = task;
  return {
    id,
    sequence: (index + 1) * 10,
    title,
    subtasks: subtasks.map((subtask, subIndex) => ({
      id: `${activityId}-${id}-${subIndex + 1}`,
      sequence: (subIndex + 1) * 10,
      title: subtask
    }))
  };
}

function activity(id, title, category, tasks) {
  return {
    id,
    title,
    category,
    scope: 'global',
    location_specific: false,
    tasks: tasks.map((task, index) => taskObject(id, task, index))
  };
}

export const everydayActivityTemplates = [
  activity('party-birthday-planning', 'Plan a party or birthday celebration', 'events', [
    ['define-event', 'Define the celebration, budget, and guest experience', ['Choose the date, occasion, theme, and spending limit', 'Estimate the guest count and note age, accessibility, or dietary needs']],
    ['venue-guests', 'Confirm the venue and manage invitations', ['Reserve the location and prepare a weather or capacity backup when needed', 'Send invitations with RSVP details, timing, address, and contact information']],
    ['food-cake', 'Plan food, drinks, cake, and serving needs', ['Choose quantities and options for dietary restrictions', 'Confirm ordering, pickup or delivery times, refrigeration, and serving supplies']],
    ['activities-decor', 'Prepare decorations, activities, music, and party supplies', ['Choose age-appropriate entertainment and a simple activity timeline', 'Gather decorations, candles, favors, games, audio, and setup materials']],
    ['day-of-close', 'Run event-day setup, hosting, and cleanup', ['Create a short setup timeline and assign help for food, guests, photos, or activities', 'Store leftovers safely, collect gifts and belongings, clean the space, and return rented items']]
  ]),
  activity('weekend-chores-house-cleaning', 'Complete weekend chores and house cleaning', 'household', [
    ['reset-plan', 'Walk through the home and choose the weekend cleaning priorities', ['Identify the rooms and chores that most need attention', 'Time-box the work and assign tasks when the household is sharing chores']],
    ['laundry-clutter', 'Clear clutter, laundry, trash, and recycling', ['Return misplaced items and collect laundry from bedrooms and bathrooms', 'Start laundry loads and empty household trash and recycling']],
    ['clean-surfaces', 'Clean kitchen, bathroom, and frequently touched surfaces', ['Wipe counters, sinks, appliances, tables, handles, and other high-touch areas', 'Clean toilets, showers or tubs, mirrors, and bathroom fixtures with appropriate products']],
    ['floors-bedrooms', 'Refresh bedrooms and clean floors', ['Change bed linens, dust reachable surfaces, and tidy bedside areas', 'Vacuum or sweep rooms first, then mop hard floors where needed']],
    ['restock-reset', 'Restock supplies and reset the home for the coming week', ['Refill toiletries, cleaning supplies, paper goods, and other low essentials', 'Put away laundry and cleaning tools, then note repairs or chores that need a later follow-up']]
  ]),
  activity('packing-checklist', 'Create a reusable packing checklist', 'travel', [
    ['trip-needs', 'Confirm trip details and baggage constraints', ['Check destination weather, planned activities, trip length, and laundry access', 'Review airline, train, vehicle, or lodging baggage limits and special-item rules']],
    ['essentials', 'Pack critical documents, money, medication, and personal essentials', ['Pack identification, tickets or confirmations, payment methods, keys, and secure copies', 'Pack prescription medication, glasses or contacts, and other items that are difficult to replace']],
    ['clothing', 'Pack clothing and footwear by day and activity', ['Choose outfits, layers, sleepwear, underwear, socks, and weather protection', 'Match shoes and specialty clothing to planned activities and avoid unnecessary duplicates']],
    ['toiletries-tech', 'Pack toiletries, electronics, and charging accessories', ['Use travel-size liquids when required and pack personal-care items that may not be available', 'Pack phones, cameras, headphones, chargers, adapters, cables, and a power bank when useful']],
    ['final-check', 'Complete a final bag and departure check', ['Weigh, close, identify, and secure bags and keep valuables or must-have items in the appropriate carry-on', 'Use the checklist one last time for documents, medication, wallet, phone, keys, and home security before leaving']]
  ]),
  activity('holiday-dinner-hosting', 'Host a holiday or dinner gathering', 'events', [
    ['guest-plan', 'Confirm the date, guest count, budget, and dietary needs', ['Track invited guests and responses, including children or plus-ones', 'Ask about allergies, dietary restrictions, accessibility needs, and arrival timing']],
    ['menu-timeline', 'Plan the menu and cooking timeline', ['Choose dishes that fit available oven, stove, refrigerator, and serving capacity', 'Identify make-ahead items and work backward from the planned serving time']],
    ['shop-supplies', 'Buy groceries, drinks, tableware, and serving supplies', ['Create a categorized shopping list and purchase shelf-stable items early', 'Confirm enough plates, glasses, utensils, napkins, serving dishes, storage containers, and ice']],
    ['prepare-home', 'Prepare the dining and guest areas before people arrive', ['Clean the entry, bathroom, kitchen, dining area, and other spaces guests will use', 'Set the table or buffet, arrange seating, and prepare a place for coats, bags, and shoes']],
    ['host-close', 'Serve the meal safely and close the gathering cleanly', ['Coordinate final cooking, hot and cold holding, serving, drinks, and guest needs', 'Refrigerate leftovers promptly, handle dishes and trash, and return the kitchen and guest areas to order']]
  ]),
  activity('road-trip-planning', 'Plan a road trip', 'travel', [
    ['route-stops', 'Plan the route, driving schedule, and essential stops', ['Estimate realistic drive time, mileage, tolls, fuel or charging needs, and rest breaks', 'Choose primary and alternate routes and identify safe food, restroom, fuel, or charging stops']],
    ['vehicle-readiness', 'Check vehicle readiness and roadside essentials', ['Check tires and pressure, fluids, lights, wipers, fuel or charge level, and any service that is due', 'Confirm spare-tire or repair equipment, emergency supplies, and roadside-assistance information']],
    ['bookings', 'Organize lodging, reservations, and destination details', ['Confirm addresses, check-in times, parking, attraction reservations, and cancellation terms', 'Save important confirmations and maps for offline access when coverage may be limited']],
    ['pack-road', 'Pack driver documents, food, water, technology, and comfort items', ['Bring license, registration, insurance information, medication, first aid, water, snacks, and weather-appropriate essentials', 'Pack phone mounts, charging cables, power banks, sunglasses, entertainment, and comfort items without blocking driver visibility']],
    ['departure-check', 'Complete the final safety and departure check', ['Review weather, road closures, traffic, and the condition of all drivers before departure', 'Fuel or charge the vehicle, share the itinerary with a trusted contact, secure the home, and plan driver rotation or rest for longer trips']]
  ])
];