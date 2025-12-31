FROM jekyll/jekyll:4

# Copy Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Install dependencies
# We use true to ignore errors if Gemfile.lock has platform specific issues
RUN bundle install || true

# Copy the rest of the site
COPY . .

CMD ["jekyll", "serve", "--force_polling", "--livereload", "--host", "0.0.0.0"]
