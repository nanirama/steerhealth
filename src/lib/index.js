import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat"; // for Do (1st, 2nd, 3rd...)

dayjs.extend(advancedFormat);

export function formatEventDate(startDate, endDate) {
  const start = dayjs(startDate);
  const end = endDate ? dayjs(endDate) : null;

  if (!end) {
    // Only start date with time
    return start.format("dddd, MMMM Do | h:mm A");
  }

  // Same day
  if (start.isSame(end, "day")) {
    return `${start.format("dddd, MMMM Do | h:mm")} – ${end.format("h:mm A")}`;
  }

  // Different days
  return `${start.format("dddd, MMMM Do | h:mm A")} – ${end.format("dddd, MMMM Do | h:mm A")}`;
}
export const getHeroImagePath = (filename) => {
  if (!filename) return '';
  return filename.startsWith('/') ? filename : `/images/hero/${filename}`;
};

// Get blur image path from filename
export const getHeroBlurPath = (filename) => {
  if (!filename) return '';
  return filename.startsWith('/') ? filename : `/images/hero/blur/${filename}`;
};

export const getVideoName = (videoUrl) => {
  if (!videoUrl) return '';

  const parts = videoUrl.split('/'); // Split by slash to get filename
  const filename = parts[parts.length - 1]; // Get the last part (the file name with extension)
  const nameWithoutExtension = filename.split('.').slice(0, -1).join('.'); // Remove extension

  return nameWithoutExtension;
};

export const getGradientTextColor = (children, value, page) => {
    if (value?.label === 'Blue Gradient Color') {
        return (
            <span className={`bg-gradient-to-r from-[#6FCAFF] via-[#3591FA] to-[#0030A6] bg-clip-text text-transparent ${page==='acquire-benefits' && 'italic px-1'}`}>{children}</span>
        )
    }
    else {
        return (
            <span style={{ color: value?.value }}>{children}</span>
        )
    }
}