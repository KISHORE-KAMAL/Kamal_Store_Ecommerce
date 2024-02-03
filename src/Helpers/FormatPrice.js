const FormatPrice = ({price}) => {
  return Intl.NumberFormat("en-IN",{
    style:"currency",
    currency:"INR",
    maximumFractionDigits:2
  }).format(price/100);   

    //1 rupee = 100 paise   (so to convert, we divide by 100)
    //price=6000000 then convert paise to rupees by dividing 100 ie.(6000000/100=60,000.00)
}

export default FormatPrice