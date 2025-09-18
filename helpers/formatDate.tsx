// utils/DateFormatter.ts
const MONTHS_ID = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

const MONTHS_FULL_ID = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export type DateFormatType =
  | 'dd MMM yyyy'
  | 'dd MMMM yyyy'
  | 'yyyy-MM-dd'
  | 'MMM yyyy'
  | 'yyyy'
  | 'full';
/**
 * Formats a date into a specified string format
 * @param dateInput - Date to format (string, number, or Date object)
 * @param format - Output format ('dd MMM yyyy', 'yyyy-MM-dd', 'full', 'MMM yyyy', 'yyyy')
 * @returns Formatted date string
 * @example
 * // Returns "01 Jan 2023"
 * formatDate('2023-01-01', 'dd MMM yyyy')

 * // Returns "01 Janauari 2023"
 * formatDate('2023-01-01', 'dd MMM yyyy')
 *
 * // Returns "2023-01-01"
 * formatDate('2023-01-01', 'yyyy-MM-dd')
 *
 * // Returns "Minggu, 01 Januari 2023" (in Indonesian format)
 * formatDate('2023-01-01', 'full')
 *
 * // Returns "Jan 2023"
 * formatDate('2023-01-01', 'MMM yyyy')
 *
 * // Returns "2023"
 * formatDate('2023-01-01', 'yyyy')
 *
 * @throws {Error} If date is invalid or format type is unknown
 */

export function formatDate(
  dateInput: string | number | Date,
  format: DateFormatType = 'dd MMM yyyy',
): string {
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const day = date.getDate().toString().padStart(2, '0');
  const month = date.getMonth();
  const year = date.getFullYear();

  switch (format) {
    case 'dd MMM yyyy':
      return `${day} ${MONTHS_ID[month]} ${year}`;
    case 'dd MMMM yyyy':
      return `${day} ${MONTHS_FULL_ID[month]} ${year}`;
    case 'yyyy-MM-dd':
      return `${year}-${(month + 1).toString().padStart(2, '0')}-${day}`;
    case 'full':
      return date.toLocaleString('id-ID', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    case 'MMM yyyy':
      return `${MONTHS_ID[month]} ${year}`;
    case 'yyyy':
      return `${year}`;
    default:
      throw new Error(`Unknown format type: ${format}`);
  }
}
/**
 * Calculates age based on birth date
 * @param tanggalLahir Birth date in string or Date format
 * @returns Age in years
 * @example
 * // Returns 20 (if current date is 2023 and birth date is 2003)
 * age('2003-01-01')
 *
 * // Returns 19 (if current date is 2023-05-01 and birth date is 2003-06-01)
 * age('2003-06-01')
 *
 * @throws {Error} If birth date is invalid
 */

export function age(tanggalLahir: string | Date): number {
  const lahir = new Date(tanggalLahir);
  const sekarang = new Date();

  let usia = sekarang.getFullYear() - lahir.getFullYear();
  const bulan = sekarang.getMonth() - lahir.getMonth();
  const hari = sekarang.getDate() - lahir.getDate();

  // Koreksi jika belum ulang tahun tahun ini
  if (bulan < 0 || (bulan === 0 && hari < 0)) {
    usia--;
  }

  return usia;
}

/**
 * Calculates the difference between two dates in years, months, and days
 * @param tanggalAwal Start date in string or Date format
 * @param tanggalAkhir End date in string or Date format
 * @returns Object containing years, months, and days difference
 * @example
 * // Returns { years: 1, months: 2, days: 3 }
 * dateRange('2022-01-01', '2023-03-04')
 *
 * @throws {Error} If either date is invalid
 */
export function dateRange(
  tanggalAwal: string | Date,
  tanggalAkhir: string | Date,
) {
  const start = new Date(tanggalAwal);
  const end = tanggalAkhir ? new Date(tanggalAkhir) : new Date();

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  // Adjust for negative days
  if (days < 0) {
    months--;
    const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += lastMonth.getDate();
  }

  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years ? years + ' tahun' : ''} ${months ? months + ' bulan' : ''} ${
    days ? days + ' hari' : ''
  }`.trim();
}

/**
 * Returns a human readable time difference in Indonesian
 * @param date Date to compare with current time
 * @returns String representing time difference (e.g. "1 tahun yang lalu", "1 jam yang lalu")
 */
export function timeAgo(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diff = now.getTime() - past.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} tahun yang lalu`;
  } else if (months > 0) {
    return `${months} bulan yang lalu`;
  } else if (days > 0) {
    return `${days} hari yang lalu`;
  } else if (hours > 0) {
    return `${hours} jam yang lalu`;
  } else if (minutes > 0) {
    return `${minutes} menit yang lalu`;
  } else {
    return 'baru saja';
  }
}

// formatDate.js

// This array will hold Indonesian month names
const monthNames = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export function formatDateId(dateString: any) {
  if (!dateString) {
    return '';
  }

  const dateObject = new Date(dateString);

  // Get the date components
  const day = dateObject.getDate();
  const month = monthNames[dateObject.getMonth()];
  const year = dateObject.getFullYear();

  // Get the time components
  const hours = String(dateObject.getHours()).padStart(2, '0');
  const minutes = String(dateObject.getMinutes()).padStart(2, '0');
  const seconds = String(dateObject.getSeconds()).padStart(2, '0');

  // Construct the formatted string
  return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
};
