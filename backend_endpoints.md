# Backend API Endpoints
## POST /auth/register - Register a new user ['Auth']
  - Request Body: application/json (registerDto)

## POST /auth/login - User login ['Auth']
  - Request Body: application/json (loginDto)

## POST /auth/refresh-token - Refresh access token ['Auth']
  - Request Body: application/json (refreshTokenDto)

## GET /auth/me -  ['Auth']

## POST /otp/send - Send OTP ['OTP']
  - Request Body: application/json (SendOtpDto)

## POST /otp/resend - Resend OTP ['OTP']
  - Request Body: application/json (SendOtpDto)

## POST /otp/verify - Verify OTP ['OTP']
  - Request Body: application/json (VerifyOtpDto)

## POST /email-service/send - Send email ['Mail']
  - Request Body: application/json (SendEmailDto)

## POST /countries - Create a country ['Countries']
  - Request Body: application/json (CreateCountryDto)

## GET /countries - Get all countries ['Countries']
  - Parameters:
    - page (query): optional
    - limit (query): optional
    - ignoreLimit (query): optional
    - country_name (query): optional
    - country_code (query): optional
    - name (query): optional
    - countryCode (query): optional

## GET /countries/{id} - Get country by ID ['Countries']
  - Parameters:
    - id (path): required

## DELETE /countries/{id} - Delete country by ID ['Countries']
  - Parameters:
    - id (path): required

## PATCH /countries/{id} - Update country by ID ['Countries']
  - Parameters:
    - id (path): required
  - Request Body: application/json (UpdateCountryDto)

## POST /cities - Create a city ['Cities']
  - Request Body: application/json (CreateCityDto)

## GET /cities - Get all cities ['Cities']
  - Parameters:
    - page (query): optional
    - limit (query): optional
    - ignoreLimit (query): optional
    - city_name (query): optional
    - country_id (query): optional
    - search (query): optional
    - countryId (query): optional

## GET /cities/{id} - Get city by ID ['Cities']
  - Parameters:
    - id (path): required

## DELETE /cities/{id} - Delete city by ID ['Cities']
  - Parameters:
    - id (path): required

## PATCH /cities/{id} - Update city by ID ['Cities']
  - Parameters:
    - id (path): required
  - Request Body: application/json (UpdateCityDto)

## POST /currencies - Create a currency ['Currencies']
  - Request Body: application/json (CreateCurrencyDto)

## GET /currencies - Get all currencies ['Currencies']
  - Parameters:
    - page (query): optional
    - limit (query): optional
    - ignoreLimit (query): optional
    - currency_name (query): optional
    - currency_code (query): optional
    - search (query): optional

## GET /currencies/{id} - Get currency by ID ['Currencies']
  - Parameters:
    - id (path): required

## DELETE /currencies/{id} - Delete currency by ID ['Currencies']
  - Parameters:
    - id (path): required

## PATCH /currencies/{id} - Update currency by ID ['Currencies']
  - Parameters:
    - id (path): required
  - Request Body: application/json (UpdateCurrencyDto)

## POST /unit-categories - Create a unit category ['Unit Categories']
  - Request Body: application/json (CreateUnitCategoryDto)

## GET /unit-categories - Get all unit categories ['Unit Categories']
  - Parameters:
    - page (query): optional
    - limit (query): optional
    - ignoreLimit (query): optional
    - unit_categories_name (query): optional
    - icon (query): optional
    - search (query): optional

## GET /unit-categories/{id} - Get unit category by ID ['Unit Categories']
  - Parameters:
    - id (path): required

## DELETE /unit-categories/{id} - Delete unit category by ID ['Unit Categories']
  - Parameters:
    - id (path): required

## PATCH /unit-categories/{id} - Update unit category by ID ['Unit Categories']
  - Parameters:
    - id (path): required
  - Request Body: application/json (UpdateUnitCategoryDto)

## PUT /app-settings - Upsert app settings ['App Settings']
  - Request Body: application/json (UpsertAppSettingsDto)

## GET /app-settings - Get app settings ['App Settings']

## POST /units - Create a unit ['Units']
  - Request Body: multipart/form-data (Inline Schema)

## GET /units - Get all active units ['Units']
  - Parameters:
    - page (query): optional
    - limit (query): optional
    - ignoreLimit (query): optional
    - unit_title (query): required
    - unit_country_id (query): required
    - unit_city_id (query): required
    - title (query): optional
    - country (query): optional
    - city (query): optional

## PATCH /units/{id} - Update unit ['Units']
  - Parameters:
    - id (path): required
  - Request Body: application/json (UpdateUnitDto)

## GET /units/{id} - Get unit by ID ['Units']
  - Parameters:
    - id (path): required

## GET /units/by-user - Get my units ['Units']
  - Parameters:
    - page (query): optional
    - limit (query): optional
    - ignoreLimit (query): optional
    - unit_title (query): required
    - unit_country_id (query): required
    - unit_city_id (query): required
    - title (query): optional
    - country (query): optional
    - city (query): optional

## DELETE /units/{id}/soft-delete - Delete unit ['Units']
  - Parameters:
    - id (path): required

## PATCH /units/{id}/deactivate - Deactivate unit ['Units']
  - Parameters:
    - id (path): required

## PATCH /units/{id}/activate - Activate unit ['Units']
  - Parameters:
    - id (path): required

## DELETE /units/{id}/delete-photos - Delete unit photos ['Units']
  - Parameters:
    - id (path): required
  - Request Body: application/json (DeleteUnitPhotosDto)

## PATCH /units/{id}/update-photos - Update unit photos ['Units']
  - Parameters:
    - id (path): required
  - Request Body: multipart/form-data (Inline Schema)

## GET /units/{id}/reviews - Get unit reviews ['Units']
  - Parameters:
    - id (path): required
    - page (query): optional
    - limit (query): optional
    - ignoreLimit (query): optional

## GET /bookings/check-availability - Check unit availability ['Bookings']
  - Parameters:
    - unit_id (query): required
    - check_in (query): required
    - check_out (query): required
    - adults_count (query): optional
    - kids_count (query): optional
    - unit (query): required
    - checkIn (query): required
    - checkOut (query): required
    - adultsCount (query): optional
    - kidsCount (query): optional

## POST /bookings - Create a booking ['Bookings']
  - Request Body: application/json (BookingRequestDto)

## GET /bookings - Get all bookings ['Bookings']
  - Parameters:
    - page (query): optional
    - limit (query): optional
    - ignoreLimit (query): optional
    - status (query): optional
    - unit_id (query): optional
    - host_id (query): optional
    - check_out (query): optional
    - check_in (query): optional
    - sort_by_created_at (query): optional
    - sort_by_total_amount (query): optional
    - user_type (query): optional
    - unit (query): optional
    - checkIn (query): optional
    - checkOut (query): optional
    - sortByCreatedAt (query): optional
    - sortByTotalAmount (query): optional
    - userType (query): optional

## GET /bookings/my-bookings - Get my bookings ['Bookings']
  - Parameters:
    - page (query): optional
    - limit (query): optional
    - ignoreLimit (query): optional
    - status (query): optional
    - unit_id (query): optional
    - host_id (query): optional
    - check_out (query): optional
    - check_in (query): optional
    - sort_by_created_at (query): optional
    - sort_by_total_amount (query): optional
    - user_type (query): optional
    - unit (query): optional
    - checkIn (query): optional
    - checkOut (query): optional
    - sortByCreatedAt (query): optional
    - sortByTotalAmount (query): optional
    - userType (query): optional

## GET /bookings/{id} - Get booking by ID ['Bookings']
  - Parameters:
    - id (path): required

## PATCH /bookings/{id} - Update booking by guest ['Bookings']
  - Parameters:
    - id (path): required
  - Request Body: application/json (UpdateBookingRequestDto)

## PATCH /bookings/{id}/cancel - Cancel booking by guest ['Bookings']
  - Parameters:
    - id (path): required
  - Request Body: application/json (CancelBookingByGuestDto)

## PATCH /bookings/{id}/status - Change booking status by host ['Bookings']
  - Parameters:
    - id (path): required
  - Request Body: application/json (ChangeBookingStatusDto)

## PATCH /bookings/{id}/submit-review - Submit booking review ['Bookings']
  - Parameters:
    - id (path): required
  - Request Body: application/json (GuestReviewDto)

## POST /unit-favourites/{unitId} - Add unit favorite ['Unit Favorites']
  - Parameters:
    - unitId (path): required

## DELETE /unit-favourites/{unitId} - Remove unit favorite ['Unit Favorites']
  - Parameters:
    - unitId (path): required

## GET /unit-favourites - Get my unit favorites ['Unit Favorites']
  - Parameters:
    - page (query): optional
    - limit (query): optional
    - ignoreLimit (query): optional

## POST /forget-password/send - Send forget-password OTP ['Forget Password']
  - Request Body: application/json (SendForgetPasswordOtpDto)

## POST /forget-password/verify - Verify forget-password OTP ['Forget Password']
  - Request Body: application/json (VerifyForgetPasswordOtpDto)

## POST /forget-password/reset - Reset password ['Forget Password']
  - Request Body: application/json (ResetPasswordDto)

