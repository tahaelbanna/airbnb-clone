# DTOs
## registerDto
  - name*: string
  - email*: string
  - password*: string
  - phone*: string
## UserResponseDto
  - _id*: string
  - name*: string
  - email*: string
  - phoneNumber*: string
## RegisterResponseDto
  - user*: any
  - accessToken*: string
  - refreshToken*: string
## loginDto
  - email*: string
  - password*: string
  - role*: string
## AuthResponseDto
  - accessToken*: string
  - refreshToken*: string
## refreshTokenDto
  - refreshToken*: string
## SendOtpDto
  - email*: string
## VerifyOtpDto
  - email*: string
  - code*: string
## SendEmailDto
  - to*: string
  - subject*: string
  - text*: string
## CreateCountryDto
  - country_name*: string
  - country_code: string
## CountryResponseDto
  - _id*: string
  - country_name*: string
  - country_code*: string
## UpdateCountryDto
  - country_name: string
  - country_code: string
## CreateCityDto
  - city_name*: string
  - country_id*: string
## CityResponseDto
  - _id*: string
  - country_id*: string
  - city_name*: string
## UpdateCityDto
  - city_name: string
  - country_id: string
## CreateCurrencyDto
  - currency_name*: string
  - currency_code: string
## CurrencyResponseDto
  - _id*: string
  - currency_name*: string
  - currency_code*: string
## UpdateCurrencyDto
  - currency_name: string
  - currency_code: string
## CreateUnitCategoryDto
  - unit_categories_name*: string
  - icon*: string
## UnitCategoryResponseDto
  - _id*: string
  - unit_categories_name*: string
  - icon*: string
## UpdateUnitCategoryDto
  - unit_categories_name: string
  - icon: string
## UpsertAppSettingsDto
  - vat_rate: number
  - min_price: number
## AppSettingsResponseDto
  - vat_rate*: number
  - min_price*: number
## UnitResponseDto
  - _id*: string
  - unit_title*: string
  - unit_description*: string
  - unit_address*: string
  - unit_photos*: array
  - unit_cost_per_night*: number
  - unit_country_id*: string
  - unit_city_id*: string
  - unit_category_id*: string
  - unit_owner_id*: string
  - unit_avg_rate*: number
  - unit_reviews_count*: number
  - unit_rooms_count*: number
  - unit_adults_count*: number
  - unit_kids_count*: number
  - has_internet_service*: boolean
  - has_kitchen*: boolean
  - has_private_garage*: boolean
  - isDeleted*: boolean
  - isActive*: boolean
## UpdateUnitDto
  - unit_title: string
  - unit_description: string
  - unit_address: string
  - unit_photos: array
  - unit_cost_per_night: number
  - unit_country_id: string
  - unit_city_id: string
  - unit_category_id: string
  - unit_rooms_count: number
  - unit_adults_count: number
  - unit_kids_count: number
  - has_internet_service: boolean
  - has_kitchen: boolean
  - has_private_garage: boolean
## DeleteUnitPhotosDto
  - unit_photos*: array
## GuestReviewResponseDto
  - _id*: string
  - name*: string
## GetUnitReviewResponseDto
  - guest*: any
  - rating*: number
  - comment*: string
  - createdAt*: string
## Object
## AvailabilityResponseDto
  - available*: boolean
  - nights_count*: number
  - price_per_night*: number
  - booking_amount*: number
  - vat_amount*: number
  - total_amount*: number
## BookingRequestDto
  - unit_id*: string
  - check_in*: object
  - check_out*: object
  - adults_count*: number
  - kids_count*: number
  - notes: string
## GuestReview
## BookingResponseDto
  - _id*: string
  - unit_id*: string
  - host_id*: string
  - guest_id*: string
  - cancellation_reason: string
  - check_in*: string
  - check_out*: string
  - adults_count*: number
  - kids_count*: number
  - price_per_night*: number
  - nights_count*: number
  - booking_amount*: number
  - vat*: number
  - vat_amount*: number
  - total_amount*: number
  - status*: string
  - notes: string
  - guest_review: any
## UpdateBookingRequestDto
  - check_in: object
  - check_out: object
  - adults_count: number
  - kids_count: number
  - notes: string
## CancelBookingByGuestDto
  - cancellation_reason: string
## ChangeBookingStatusDto
  - status*: string
  - cancellation_reason: string
## GuestReviewDto
  - rating*: number
  - comment: string
## UnitFavouritesResponseDto
  - _id*: string
  - unit_title*: string
  - unit_id*: string
  - unit_cost_per_night*: number
  - unit_photos*: array
## SendForgetPasswordOtpDto
  - email*: string
## VerifyForgetPasswordOtpDto
  - email*: string
  - code*: string
## ResetPasswordDto
  - email*: string
  - newPassword*: string
