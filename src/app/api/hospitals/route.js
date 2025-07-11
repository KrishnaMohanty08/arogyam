import { NextResponse } from 'next/server';

export async function GET() {
  const hospitals = [
    {
      name: 'Matrenity Care Hospital',
      address: 'CRPF Square, Bhubaneswar',
      lat: 20.29435,
      lng: 85.84415,
      beds: { General: 8, ICU: 4, Emergency: 5, Maternity: 0, SDU: 0, special: 2},
      wait: { Maternity: "10–20 min", SDU: "15–25 min" },
      phone: '+91-674-1234567',
      email: 'info@lionshospital.com',
      website: 'https://lionshospital.com',
    },
    {
      name: 'Millennium Hospitals',
      address: 'Near Gandhi Chhak, Bhubaneswar',
      lat: 20.2975,
      lng: 85.8370,
      beds: { General: 14, ICU: 3, Emergency: 2, Maternity: 0, SDU: 1 },
      wait: { Maternity: "20-25 min" },
      phone: '+91-674-2223344',
      email: 'contact@millenniumhospitals.com',
      website: 'https://millenniumhospitals.com',
    },
    {
      name: 'ESI Hospital',
      address: 'Jayadev Vihar Road, Bhubaneswar',
      lat: 20.2960,
      lng: 85.8406,
      beds: { General: 20, ICU: 0, Emergency: 4, Maternity: 2, SDU: 3 },
      wait: { ICU: "10–15 min" },
      phone: '+91-674-2345678',
      email: 'support@esihospital.gov.in',
      website: 'https://esihospital.gov.in',
    },
    {
      name: 'Jaganath Hospital',
      address: 'Unnamed Road, Bhubaneswar',
      lat: 20.2995,
      lng: 85.8412,
      beds: { General: 0, ICU: 6, Emergency: 3, Maternity: 10, SDU: 6 },
      wait: { General: "8–15 min" },
      phone: '+91-674-4455667',
      email: 'admin@jaganathhospital.com',
      website: 'https://jaganathhospital.com',
    },
    {
      name: 'National City Medical',
      address: 'Unnamed Road, Bhubaneswar',
      lat: 20.2958,
      lng: 85.8420,
      beds: { General: 25, ICU: 5, Emergency: 0, Maternity: 3, SDU: 0 },
      wait: { Emergency: "5–12 min", SDU: "15–25 min" },
      phone: '+91-674-4455123',
      email: 'info@nationalcitymed.com',
      website: 'https://nationalcitymed.com',
    },
    {
      name: 'Apollo Hospital',
      address: 'Unnamed Road, Bhubaneswar',
      lat: 20.2945,
      lng: 85.8415,
      beds: { General: 20, ICU: 4, Emergency: 0, Maternity: 0, SDU: 8 },
      wait: { Emergency: "25–30 min", Maternity: "10–20 min" },
      phone: '+91-674-5566778',
      email: 'care@padmahospital.com',
      website: 'https://padmahospital.com',
    },
    {
      name: 'Gastro and Kidney Care Hospital',
      address: 'Saheed Nagar, Bhubaneswar',
      lat: 20.2965,
      lng: 85.8445,
      beds: { General: 0, ICU: 14, Emergency: 8, Maternity: 5, SDU: 11 },
      wait: { General: "18-25 min" },
      phone: '+91-674-2233445',
      email: 'gastro@kidneycare.in',
      website: 'https://kidneycare.in',
    },
    {
      name: 'Sunshine Hospital',
      address: 'Unnamed Road, Bhubaneswar',
      lat: 20.2938,
      lng: 85.8408,
      beds: { General: 7, ICU: 3, Emergency: 4, Maternity: 0, SDU: 6 },
      wait: { Maternity: "22–30 min" },
      phone: '+91-674-7890123',
      email: 'info@sunshinehosp.com',
      website: 'https://sunshinehosp.com',
    },
    {
      name: 'AIMS Hospital',
      address: 'Near Jan Path, Bhubaneswar',
      lat: 20.2967,
      lng: 85.8422,
      beds: { General: 15, ICU: 3, Emergency: 0, Maternity: 8, SDU: 9 },
      wait: { Emergency: "10-15 min" },
      phone: '+91-674-9988776',
      email: 'connect@aimshospital.org',
      website: 'https://aimshospital.org',
    },
    {
      name: 'Padma Hospital',
      address: 'Near Jan Path, Bhubaneswar',
      lat: 20.2985,
      lng: 85.8425,
      beds: { General: 30, ICU: 0, Emergency: 0, Maternity: 7, SDU: 5 },
      wait: { ICU: "15–20 min", Emergency: "30-35 min" },
      phone: '+91-674-5566778',
      email: 'care@padmahospital.com',
      website: 'https://padmahospital.com',
    },
    {
      name: 'Ayush Hospital',
      address: 'Near Acharya Vihar Square, Bhoi Nagar, Bhubaneswar',
      lat: 20.2963945,
      lng: 85.834406,
      beds: { General: 30, ICU: 0, Emergency: 3, Maternity: 7, SDU: 0 },
      wait: { ICU: "12–15 min", SDU: "15–25 min" },
      phone: '+91-674-3344556',
      email: 'hello@ayushhospital.com',
      website: 'https://ayushhospital.com',
    },
    {
      name: 'Trinity Hospital',
      address: 'Bhol Nagar, Vani Vihar, Bhubaneswar',
      lat: 20.29493,
      lng: 85.83977,
      beds: { General: 14, ICU: 10, Emergency: 0, Maternity: 0, SDU: 4 },
      wait: { Emergency: "15–18 min", Maternity: "10–20 min" },
      phone: '+91-674-1122334',
      email: 'neuro@trinityhospital.org',
      website: 'https://trinityhospital.org',
    },
    {
      name: 'Sparsh Hospital & Critical Care Pvt. Ltd.',
      address: 'Saheed Nagar, Bhubaneswar',
      lat: 20.2954,
      lng: 85.8433,
      beds: { General: 8, ICU: 6, Emergency: 5, Maternity: 2, SDU: 0 },
      wait: { SDU: "12–18 min" },
      phone: '+91-674-7766554',
      email: 'info@sparshcare.com',
      website: 'https://sparshcare.com',
    },
    {
      name: 'Power Hospital',
      address: 'Gate No 3, OPTCL, Gridco Colony, Bhoinagar, Bhubaneswar',
      lat: 20.2940,
      lng: 85.8367,
      beds: { General: 5, ICU: 0, Emergency: 3, Maternity: 0, SDU: 6 },
      wait: { ICU: "14–18 min", Maternity: "20–25 min" },
      phone: '+91-674-3322110',
      email: 'power@hospital.in',
      website: 'https://powerhospital.in',
    },
  ];

  return NextResponse.json(hospitals);
}
