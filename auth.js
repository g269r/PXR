const supabase = supabase.createClient('https://floootttcuorptrudwzu.supabase.co', 'YOUR_PUBLIC_ANON_KEY');

window.addEventListener('DOMContentLoaded', async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    window.location.href = 'login.html';
    return;
  }

  const user = session.user;
  const { data, error: dbErr } = await supabase
    .from('whitelist_users')
    .select('whitelisted')
    .eq('discord_id', user.user_metadata.sub)
    .single();

  document.getElementById('user-info').textContent = `Logged in as ${user.user_metadata.full_name}`;

  if (dbErr || !data) {
    document.getElementById('access-control').innerHTML = `
      🔒 You are not whitelisted yet.<br>
      View your <a href="apply.html" class="underline text-orange-400">Application Status</a>`;
  } else if (data.whitelisted) {
    document.getElementById('access-control').innerHTML = `
      ✅ You are whitelisted! Enjoy full access to PantherX RP features.`;
  } else {
    document.getElementById('access-control').innerHTML = `
      🕒 Your application is under review.`;
  }
});
