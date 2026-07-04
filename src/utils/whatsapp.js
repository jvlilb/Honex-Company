export const openWhatsApp = () => {
  const number = "+213791390711";
  const message = "مرحباً فريق Honex، أريد البدء في مشروع جديد. التفاصيل المبدئية للمشروع: ... / ميزانيتي المتوقعة: ... / اسمي: ...";
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${number}?text=${encodedMessage}`, "_blank");
};
